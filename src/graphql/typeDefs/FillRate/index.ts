import { gql } from 'apollo-server'

const fillRateTypDef = gql`
  type FillRate {
    id: ID
    vendor: [VendorFillRate]
    customer: [CustomerFillRate]
  }

  type VendorFillRate {
    id: ID!
    vendor: String
    fillrate: Float
  }

  type CustomerFillRate {
    id: ID
    customer: String
    fillrate: Float
  }
  type Query {
    sevenDaysFillRate: FillRate
    oneMonthFillRate: FillRate
    oneYearFillRate: FillRate
  }
`

export default fillRateTypDef
