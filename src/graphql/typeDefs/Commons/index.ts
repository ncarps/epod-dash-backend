import { gql } from 'apollo-server'

const reportTypeDef = gql`
  type Message {
    success: Boolean
    message: String
  }
  type CompleteReport {
    id: ID
    completed: String
    pending: String
    delivery: [DeliveryStatusReport]
  }

  type DeliveryStatusReport {
    id: ID
    status: String
    date: String
    time: String
  }

  type DeliveryVarianceReport {
    id: ID
    qty: String
    varianceQty: String
    itemNumber: String
    material: String
    reasonOfVariance: String
    date: String
    time: String
    deliveryId: String
  }

  type VarianceReport {
    id: ID
    delivery: String
    variance: String
    items: [DeliveryVarianceReport]
  }

  type Query {
    allDeliverys(dateFrom: String, dateTo: String): [Delivery]
    loginAuth(userBase: String!): Message
  }
`

export default reportTypeDef
