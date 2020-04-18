import { ApolloServer } from "apollo-server";

import { resolvers, typeDefs } from "./graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// You can also easily pass variables for dynamic arguments
