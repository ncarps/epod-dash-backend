import { mergeTypes } from 'merge-graphql-schemas'

//import report from "./report";
import report from './Commons'
import shipment from './ShipmentReport'
import customer from './CustomerReport'
import vendor from './VendorReport'
import fillrate from './FillRate'
import dashreport from './DashReport'
import userInfo from './UserInfo'
import shipmentage from './ShipmentAge'
import DriverLocation from './DriverLocation'
import driver from './Driver'

const typeDefs = [
  report,
  shipment,
  customer,
  vendor,
  fillrate,
  dashreport,
  userInfo,
  shipmentage,
  DriverLocation,
  driver,
]

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
export default mergeTypes(typeDefs, { all: true })
