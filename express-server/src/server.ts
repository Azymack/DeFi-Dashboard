import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3000;

const generateFakeTransactionHash = (): string => {
  return '0x' + Array.from({ length: 64 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

const generateFakeMethod = (): string => {
  const methods = ['mint', 'burn', 'swap'];
  return methods[Math.floor(Math.random() * methods.length)];
}

const generateFakeAddress = (): string => {
  return '0x' + Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

const generateFakeDecoded = (): any => {
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
}

const pool = new Pool({
  connectionString: process.env.PG_DATABASE_URL
});

let lastBlockNumber = Math.floor(Math.random() * 1000000);

const generateNextBlockNumber = (): number => {
  const increment = Math.floor(Math.random() * 10) + 1; // Random increment between 1 and 10
  lastBlockNumber += increment;
  return lastBlockNumber;
}

const insertRandomLog = async () => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO logs (transaction_hash, decoded, address, block_number, block_timestamp, "from", "to")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
      generateFakeTransactionHash(),
      JSON.stringify(generateFakeDecoded()),
      generateFakeAddress(),
      generateNextBlockNumber(),
      new Date().toISOString(),
      generateFakeAddress(),
      generateFakeAddress()
    ];

    await client.query(query, values);
    console.log("Inserted random log into the database");
  } catch (error) {
    console.error("Error inserting random log:", error);
    throw error;
  } finally {
    client.release();
  }
}

app.use(express.json());

app.get("/push-data", async (req, res) => {
  try {
    await insertRandomLog();
    res.status(200).json({ message: "Data pushed successfully" });
  } catch (error) {
    console.error("Error in /push-data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
