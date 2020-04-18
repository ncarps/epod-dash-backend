import { gql } from 'apollo-server'

const completedReporttypeDefs = gql`
  type CompletedReport {
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
    completedReport(id: ID!): CompletedReport!
    allCompletedReport: [CompletedReport!]!
  }
`

export default completedReporttypeDefs
