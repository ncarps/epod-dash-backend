import { gql } from 'apollo-server'

const fillRateTypDef = gql`
  type SevenDaysFillRate {
    id: ID
    vendor: [VendorFillRate]
    customer: [CustomerFillRate]
  }

  type OneMonthFillRate {
    id: ID
    vendor: [VendorFillRate]
    customer: [CustomerFillRate]
  }

  type OneYearFillRate {
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
    sevenDaysFillRate: SevenDaysFillRate
    oneMonthFillRate: OneMonthFillRate
    oneYearFillRate: OneYearFillRate
  }
`

export default fillRateTypDef
