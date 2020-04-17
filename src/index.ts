export {};

const { createApolloFetch } = require("apollo-fetch");

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql",
});

// You can also easily pass variables for dynamic arguments
