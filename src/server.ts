import {ApolloServer} from 'apollo-server';

import {resolvers, typeDefs} from './graphql';
import {
  makeFetchDelivery,
  completeReportShipment,
  varianceReportShipment,
  completeReportCustomer,
  varianceReportCustomer,
  completeReportVendor,
  varianceReportVendor,
} from './helper';

const startServer = async () => {
  const context = async session => {
    const authString = session.req.headers.authorization;
    return {
      fetchDelivery: makeFetchDelivery(authString),
      completeReportShipment,
      varianceReportShipment,
      completeReportCustomer,
      varianceReportCustomer,
      completeReportVendor,
      varianceReportVendor,
    };
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  server.listen(5000, () => {
    console.log(`🚀  Server ready at http:  //localhost:5000/`);
  });
};

startServer();
