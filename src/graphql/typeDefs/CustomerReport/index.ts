import { gql } from 'apollo-server'

const customerTypeDef = gql`
  type MaterialDetails {
    id: ID
    itemNumber: String
    material: String
    uom: String
    qty: String
  }

  type Customer {
    id: ID
    customer: String
    shipment: String
    delivery: String
    noVarianceMaterial: [MaterialDetails]
    withVarianceMaterial: [MaterialDetails]
    varianceReport: VarianceReport
    materialReport: MaterialReport
  }

  type MaterialReport {
    id: ID
    totalReceived: String
    totalVariance: String
  }

  type Delivery {
    id: ID
    customer: String
    driver: String
    file: [String]
    items: [Item]
    deliveryStatus: String
    scheduledDate: String
    scheduledTime: String
    shipmentNumber: String
    trucker: String
    plateNumber: String
    helper: String
    fullAddress: String
  }

  type Item {
    id: ID
    itemNumber: String
    material: String
    pricePerUnit: String
    uom: String
    qty: String
    varianceQty: String
    reasonOfVariance: String
    deliveryDateAndTime: String
  }

  type Query {
    customerReport(customer: String): Customer
    allCustomerReport(dateFrom: String, dateTo: String): [Customer]
  }
`

export default customerTypeDef
