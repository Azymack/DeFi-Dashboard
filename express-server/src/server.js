const express = require("express");
const { Pool, Query } = require("pg");
const cron = require("node-cron");
const { ApolloServer } = require("@apollo/server");
const { gql } = require("graphql-tag");
const { expressMiddleware } = require("@apollo/server/express4");
const { PubSub } = require("graphql-subscriptions");
const { createServer } = require("http");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());

const httpServer = createServer(app);

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/subscriptions",
  verifyClient: (info, callBack) => {
    const origin = info.origin;
    const allowedOrigins = ["http://localhost:3001"];
    if (allowedOrigins.includes(origin)) {
      callBack(true);
    }
  },
});

const typeDefs = gql`
  type Decoded {
    amount0Out: String
  }
  type Update {
    method: String
    decoded: Decoded
    transaction_hash: String
    block_timestamp: String
  }
  type Activities {
    rows: [Update]
  }
  type Subscription {
    dataUpdate: Update
  }
  type Query {
    lastActivities: Activities
  }
`;

const resolvers = {
  Subscription: {
    dataUpdate: {
      subscribe: () => pubsub.asyncIterator([DATA_UPDATE_TOPIC]),
    },
  },
  Query: {
    lastActivities: async () => {
      try {
        const result = await getLastActivities();
        return result;
      } catch (error) {
        console.error("Error fetching last activities:", error);
        throw new Error("Failed to fetch last activities");
      }
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

server.start().then(() => {
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));
});

const pool = new Pool({
  connectionString: process.env.PG_DATABASE_URL,
});
const port = 3000;

httpServer.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}/graphql`);
});

const pubsub = new PubSub();

const DATA_UPDATE_TOPIC = "data_update";

const generateFakeTransactionHash = () => {
  return (
    "0x" +
    Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")
  );
};

const generateFakeMethod = () => {
  const methods = ["bridge", "swap"];
  return methods[Math.floor(Math.random() * methods.length)];
};

const generateFakeAddress = () => {
  return (
    "0x" +
    Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")
  );
};

const generateFakeDecoded = () => {
  const isSwapIn0 = Math.random() < 0.5;
  const amountIn = Math.floor(Math.random() * 1e9 + 1e6).toString();
  const amountOut = Math.floor(Math.random() * 1e9 + 1e6).toString();
  return {
    to: generateFakeAddress(),
    sender: generateFakeAddress(),
    amount0In: isSwapIn0 ? amountIn : "0",
    amount1In: isSwapIn0 ? "0" : amountIn,
    amount0Out: isSwapIn0 ? "0" : amountOut,
    amount1Out: isSwapIn0 ? amountOut : "0",
  };
};

let lastBlockNumber = Math.floor(Math.random() * 1000000);

const generateNextBlockNumber = () => {
  const increment = Math.floor(Math.random() * 10) + 1; // Random increment between 1 and 10
  lastBlockNumber += increment;
  return lastBlockNumber;
};

const insertRandomLog = async () => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO logs (method, transaction_hash, decoded, address, block_number, block_timestamp, "from", "to")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    const values = [
      generateFakeMethod(),
      generateFakeTransactionHash(),
      JSON.stringify(generateFakeDecoded()),
      generateFakeAddress(),
      generateNextBlockNumber(),
      new Date().toISOString(),
      generateFakeAddress(),
      generateFakeAddress(),
    ];

    await client.query(query, values);
    console.log("Inserted random log into the database");
  } catch (error) {
    console.error("Error inserting random log:", error);
    throw error;
  } finally {
    client.release();
  }
};

const listenDBUpdate = () => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
      return;
    }

    client.on("notification", (msg) => {
      if (msg.channel === DATA_UPDATE_TOPIC) {
        const data = JSON.parse(msg.payload);
        pubsub.publish(DATA_UPDATE_TOPIC, { dataUpdate: data });
      }
    });

    client.query("LISTEN data_update");
    console.log("LISTEN data_update");
  });
};

const getLastActivities = async () => {
  const client = await pool.connect();
  try {
    const query = `
      SELECT method, decoded, transaction_hash, block_timestamp FROM logs ORDER BY block_timestamp DESC LIMIT 6;
    `;
    const result = await client.query(query);
    return result;
  } catch (error) {
    console.error("Error inserting random log:", error);
    throw error;
  } finally {
    client.release();
  }
};

app.get("/", async (req, res) => {
  res.status(200).json("Hello");
});

cron.schedule(" * * * * *", async () => {
  try {
    await insertRandomLog();
    console.log("random data inserted.");
  } catch (error) {
    console.error("Error in random data insertion", error);
  }
});

listenDBUpdate();
