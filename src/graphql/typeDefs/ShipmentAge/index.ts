import { gql } from 'apollo-server'

const shipmentAgeTypDef = gql`
  type ShipmentAge {
    id: ID
    shipmentNumber: String
    customer: String
    vendor: String
    age: String
  }

  type Query {
    shipmentAge: [ShipmentAge]
  }
`

export default shipmentAgeTypDef
