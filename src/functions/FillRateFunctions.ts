import { CustomerFillRate, VendorFillRate, FillRate } from '../types/types'

export const makeFillRate = (deliveries: any, range: string) => {
  const fillRateArray: Array<FillRate> = deliveries.map((del) => {
    let totalFillRate = 0
    del.items.map((item: any) => {
      totalFillRate =
        totalFillRate + ((item.varianceQty + item.qty) / item.qty) * 100
    })
    return {
      fillrate: totalFillRate / del.items.length || 0,
      vendor: del.trucker,
      customer: del.customer.name,
    }
  })

  const vendorArray: Array<string> = []
  const vendorMap = new Map()
  for (const item of fillRateArray) {
    if (!vendorMap.has(item.vendor)) {
      vendorMap.set(item.vendor, true)
      vendorArray.push(item.vendor)
    }
  }

  const customerArray: Array<string> = []
  const customerMap = new Map()
  for (const item of fillRateArray) {
    if (!customerMap.has(item.customer)) {
      customerMap.set(item.customer, true)
      customerArray.push(item.customer)
    }
  }

  const vendorFillRate: Array<VendorFillRate> = vendorArray.map((v) =>
    getTotalVendorFillRate(fillRateArray, v, range),
  )
  const customerFillRate: Array<CustomerFillRate> = customerArray.map((c) =>
    getTotalCustomerFillRate(fillRateArray, c, range),
  )

  return {
    vendor: vendorFillRate,
    customer: customerFillRate,
  }
}

const getTotalCustomerFillRate = (
  fillRate: Array<FillRate>,
  customer: string,
  range: string,
) => {
  let totalFillrate = 0

  const fillRateArray: Array<FillRate> = fillRate
    .filter((x) => x.customer === customer)
    .map((fr) => {
      totalFillrate = totalFillrate + fr.fillrate
      return fr
    })
  return {
    id: range.concat(customer),
    fillrate: totalFillrate / fillRateArray.length,
    customer,
  }
}

const getTotalVendorFillRate = (
  fillRate: Array<FillRate>,
  vendor: string,
  range: string,
) => {
  let totalFillrate = 0

  const fillRateArray: Array<FillRate> = fillRate
    .filter((x) => x.vendor === vendor)
    .map((fr) => {
      totalFillrate = totalFillrate + fr.fillrate
      return fr
    })

  return {
    id: range.concat(vendor),
    fillrate: totalFillrate / fillRateArray.length,
    vendor,
  }
}
