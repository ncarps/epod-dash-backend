import { ApolloServer } from "apollo-server";

import { resolvers, typeDefs } from "./graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(5000, () => {
  console.log(`🚀  Server ready at http:  //localhost:5000/`);
});
