const { createApolloFetch } = require("apollo-fetch");

export const fetchEpodServer = createApolloFetch({
  uri: "http://localhost:4000/graphql",
});
