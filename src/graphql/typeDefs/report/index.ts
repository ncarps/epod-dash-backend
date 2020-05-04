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

  type Shipment {
    id: ID
    shipment: String
    varianceReport: [VarianceReport]
    completeReport: CompleteReport
  }

  type Vendor {
    id: ID
    vendor: String
    varianceReport: [VarianceReport]
    completeReport: CompleteReport
  }

  type Customer {
    id: ID
    customer: String
    varianceReport: [VarianceReport]
    completeReport: CompleteReport
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
    shipmentReport(shipmentNo: String): Shipment
    allShipmentReport: [Shipment]
    vendorReport(vendor: String): Vendor
    allVendorReport: [Vendor]
    customerReport(customer: String): Customer
    allCustomerReport: [Customer]
    allDeliverys: [Delivery]
    loginAuth(userBase: String!): Message
  }
`

export default reportTypeDef
