export {};

const { createApolloFetch } = require("apollo-fetch");

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql",
});

// You can also easily pass variables for dynamic arguments
fetch({
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
});
