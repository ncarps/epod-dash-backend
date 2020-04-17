import { ApolloServer } from "apollo-server";

import { resolvers, typeDefs } from "./grapgql";
import { fetchEpodServer } from "./helper";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    fetch: fetchEpodServer({
      query: `query{
          allDeliverys{
            id
            scheduledDate
            scheduledTime
            delvStatus
            driver{
              id
              name
              plateNumber
            }
            items{
              id
              itemNumber
              material
              pricePerUnit
              uom
              qty
              varianceQty
              pricePerUnit
            }
            customer{
              id
              name
              address{
                id
                building_name
                street
                city
                state
                street
                zip_code
              }
            }
            shipmentNumber
            file{
               id
              path
            }
          }
        }`,
      variables: {},
    }).then((res: any) => {
      console.log(res.data);
    }),
  },
});

server.listen(5000, () => {
  console.log(`🚀  Server ready at http:  //localhost:5000/`);
});
