import { mergeResolvers } from 'merge-graphql-schemas'

import report from './Commons'
import shipment from './ShipmentReport'
import customer from './CustomerReport'
import vendor from './VendorReport'
import fillrate from './FillRate'
const resolvers: any[] = [report, shipment, customer, vendor, fillrate]

export default mergeResolvers(resolvers)
