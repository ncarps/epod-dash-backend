import { mergeResolvers } from 'merge-graphql-schemas'

import report from './Commons'
import shipment from './ShipmentReport'
import customer from './CustomerReport'
import vendor from './VendorReport'
import fillrate from './FillRate'
import dashreport from './DashReport'
import userInfo from './UserInfo'
import shipmentdate from './ShipmentAge'
import DriverLocation from './DriverLocation'

const resolvers: any[] = [
  report,
  shipment,
  customer,
  vendor,
  fillrate,
  dashreport,
  userInfo,
  shipmentdate,
  DriverLocation,
]

export default mergeResolvers(resolvers)
