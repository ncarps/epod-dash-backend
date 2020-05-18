import { gql } from 'apollo-server'

const shipmentTypeDef = gql`
  type Shipment {
    id: ID
    shipment: String
    trucker: String
    totalDeliveries: String
    driver: String
    porter: String
    varianceReport: [VarianceReport]
    completeReport: CompleteReport
  }

  type Query {
    shipmentReport(shipmentNo: String): Shipment
    allShipmentReport(dateFrom: String, dateTo: String): [Shipment]
  }
`

export default shipmentTypeDef
