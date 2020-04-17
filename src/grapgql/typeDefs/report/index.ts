import { gql } from "apollo-server";

const reportTypeDef = gql`
  type CompleteReport {
    completed: String
    pending: String
  }
  type Shipment {
    shipment: String
    variance: String
    completed: CompleteReport
  }

  type Vendor {
    vendor: String
    variance: String
    completed: CompleteReport
  }

  type Customer {
    customer: String
    variance: String
    completed: CompleteReport
  }

  type Query {
    shipmentReport(shipmentNo: String): Shipment
    allShipmentReport: [Shipment]
    vendorReport(vendor: String): Vendor
    allVendorReport: [Vendor]
    customerReport(customer: String): Customer
    allCustomerReport: [Customer]
  }
`;

export default reportTypeDef;
