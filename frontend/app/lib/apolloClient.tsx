"use client";

import { ApolloLink, split, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
  fetchOptions: { cache: "no-store" },
});

// const wsLink = new WebSocketLink(
//   new SubscriptionClient(`ws://localhost:3000/subscriptions`, {
//     reconnect: true,
//   })
// );
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3000/subscriptions",
  })
);

// Split the link based on the operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
  });
}

export function ApolloWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
