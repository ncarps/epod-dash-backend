import { gql } from "apollo-server";

const reportTypeDef = gql`
  type CompleteReport {
    completed: String
    pending: String
  }

  type VarianceReport {
    delivery: String
    variance: String
  }

  type Shipment {
    shipment: String
    varianceReport: [VarianceReport]
    completeReport: CompleteReport
  }

  type Vendor {
    vendor: String
    varianceReport: [VarianceReport]
    completeReport: CompleteReport
  }

  type Customer {
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
  }
`;

export default reportTypeDef;
