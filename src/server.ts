import { ApolloServer } from "apollo-server";

import { resolvers, typeDefs } from "./graphql";
import {
  fetchDelivery,
  completeReportShipment,
  varianceReportShipment,
} from "./helper";

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      fetchDelivery,
      completeReportShipment,
      varianceReportShipment,
    },
  });

  server.listen(5000, () => {
    console.log(`🚀  Server ready at http:  //localhost:5000/`);
  });
};

startServer();
