import { gql } from 'apollo-server'

const vendorTypeDef = gql`
  type Vendor {
    id: ID
    vendor: String
    closeShipment: String
    totalShipment: String
    varianceReport: [VarianceReport]
    completeReport: CompleteReport
  }

  type Query {
    vendorReport(vendor: String): Vendor
    allVendorReport(dateFrom: String, dateTo: String): [Vendor]
  }
`

export default vendorTypeDef
