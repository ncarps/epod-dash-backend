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

  console.log('vendorFillRate', vendorFillRate)
  console.log('customerFillRate', customerFillRate)

  const bottomVendorFillrate = vendorFillRate
  const topVendor: Array<VendorFillRate> = getTopVendor(vendorFillRate)
  const bottomVendor: Array<VendorFillRate> = getBottomVendor(
    bottomVendorFillrate,
  )

  const topCustomer: Array<CustomerFillRate> = getTopCustomer(customerFillRate)
  const bottomCustomer: Array<CustomerFillRate> = getBottomCustomer(
    customerFillRate,
  )

  console.log('topVendor', topVendor)
  console.log('bottomVendor', bottomVendor)

  let vendor: Array<VendorFillRate> = []
  let customer: Array<CustomerFillRate> = []

  vendor = topVendor.concat(bottomVendor)
  customer = topCustomer.concat(bottomCustomer)
  vendor = [...new Set(vendor)]
  customer = [...new Set(customer)]
  return {
    vendor,
    customer,
  }
}

const getTopVendor = (vendorFillrate: Array<VendorFillRate>) => {
  const fillrate = vendorFillrate.sort((a, b) => b.fillrate - a.fillrate)
  const newFillRate = fillrate
  let length = fillrate.length / 2
  length = parseInt(length.toString())

  if (length < 5) {
    return newFillRate.filter((f, i) => i < length)
  }
  return newFillRate.filter((f, i) => i < 5)
}

const getBottomVendor = (vendorFillrate: Array<VendorFillRate>) => {
  const fillrate = vendorFillrate.sort((a, b) => a.fillrate - b.fillrate)
  const newFillRate = fillrate
  console.log('vrate', vendorFillrate.length)
  console.log('newfillrate', newFillRate)
  let length = fillrate.length / 2
  length = parseInt(length.toString())

  if (length < 5) {
    return newFillRate.filter((f, i) => i < length)
  }
  return newFillRate.filter((f, i) => i < 5)
}

const getTopCustomer = (customerFillRate: Array<CustomerFillRate>) => {
  const fillrate = customerFillRate.sort((a, b) => b.fillrate - a.fillrate)
  const newFillRate = fillrate
  let length = fillrate.length / 2
  length = parseInt(length.toString())

  if (length < 5) {
    return newFillRate.filter((f, i) => i < length)
  }
  return newFillRate.filter((f, i) => i < 5)
}

const getBottomCustomer = (customerFillRate: Array<CustomerFillRate>) => {
  const fillrate = customerFillRate.sort((a, b) => a.fillrate - b.fillrate)
  const newFillRate = fillrate
  let length = fillrate.length / 2
  length = parseInt(length.toString())

  if (length < 5) {
    return newFillRate.filter((f, i) => i < length)
  }
  return newFillRate.filter((f, i) => i < 5)
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
