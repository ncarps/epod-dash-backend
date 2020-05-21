import { mergeResolvers } from 'merge-graphql-schemas'

import report from './Commons'
import shipment from './ShipmentReport'
import customer from './CustomerReport'
import vendor from './VendorReport'
import fillrate from './FillRate'
import dashreport from './DashReport'
import userInfo from './UserInfo'
const resolvers: any[] = [
  report,
  shipment,
  customer,
  vendor,
  fillrate,
  dashreport,
  userInfo,
]

export default mergeResolvers(resolvers)
