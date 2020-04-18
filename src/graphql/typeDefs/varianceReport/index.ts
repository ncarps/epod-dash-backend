import { gql } from 'apollo-server'

const varianceReporttypeDefs = gql`
  type VarianceReport {
    id: ID!
    shipment: [Shipment]
    vendor: [Vendor]
    customer: [Customer]
  }

  type Shipment {
    shipment: String
    variance: String
  }

  type Vendor {
    vendor: String
    variance: String
  }

  type Customer {
    customer: String
    variance: String
  }

  type Query {
    varianceReport(id: ID!): VarianceReport!
    allVarianceReport: [VarianceReport!]!
  }
`

export default varianceReporttypeDefs
