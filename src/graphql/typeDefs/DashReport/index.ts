import { gql } from 'apollo-server'

const dashReportTypDef = gql`
  type DeliveryDashStatus {
    id: ID
    complete: String
    pending: String
  }

  type ShipmentDashStatus {
    id: ID
    complete: String
    pending: String
  }

  type Query {
    shipmentStatus: ShipmentDashStatus
    deliveryStatus: DeliveryDashStatus
  }
`

export default dashReportTypDef
