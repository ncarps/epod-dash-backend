import { gql } from 'apollo-server'

const drivertypeDefs = gql`
  type Driver {
    id: ID!
    name: String
    plateNumber: String
    porter: String
  }

  type Query {
    allDrivers: [Driver]
  }
`

export default drivertypeDefs
