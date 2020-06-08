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
    trucker: String
    totalDeliveries: String
    driver: String
    porter: String
    varianceReport: [VarianceReport]
    completeReport: CompleteReport
  }

  type Vendor {
    id: ID
    vendor: String
    closeShipment: String
    totalShipment: String
    varianceReport: [VarianceReport]
    completeReport: CompleteReport
  }

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
    plateNumber: String
    helper: String
    fullAddress: String
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
    allShipmentReport(dateFrom: String, dateTo: String): [Shipment]
    vendorReport(vendor: String): Vendor
    allVendorReport(dateFrom: String, dateTo: String): [Vendor]
    customerReport(customer: String): Customer
    allCustomerReport(dateFrom: String, dateTo: String): [Customer]
    allDeliverys(dateFrom: String, dateTo: String): [Delivery]
    loginAuth(userBase: String!): Message
  }
`

export default reportTypeDef
