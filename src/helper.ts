const { createApolloFetch } = require('apollo-fetch')
import { execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
import moment from 'moment'
const { authURI, PORT, EPOD_API_URI } = process.env

require('dotenv').config()

export const fetchEpodServer = createApolloFetch({
  uri: EPOD_API_URI || 'http://localhost:4000/graphql',
})

export const completeReportVendor = (trucker: any, deliveries: any) => {
  return trucker.map((t) => {
    let completeCount = 0
    let pendingCount = 0
    let delivery: any = []
    let closeShipment = 0
    deliveries
      .filter((x: any) => x.trucker === t)
      .map((d: any) => {
        if (d.delvStatus === 'Complete') {
          completeCount = completeCount + 1
        } else {
          pendingCount = pendingCount + 1
        }
        const date =
          d.scheduledDate && d.scheduledDate != null
            ? moment(d.scheduledDate).format('LL')
            : ''
        const time = d.scheduledTime
        d.scheduledTime != null ? moment(d.scheduledTime).format('LT') : ''

        delivery.push({ id: d.id, status: d.delvStatus, date, time })
      })

    const shipmentNumber: Array<String> = []
    const map = new Map()
    for (const item of deliveries) {
      if (!map.has(item.shipmentNumber)) {
        map.set(item.shipmentNumber, true)
        shipmentNumber.push(item.shipmentNumber)
      }
    }

    shipmentNumber.map((s) => {
      const statusCount = deliveries.filter(
        (d) => d.shipmentNumber === s && d.delvStatus === 'Pending',
      )
      if (!statusCount.length) {
        closeShipment = closeShipment + 1
      }
    })
    return {
      vendor: t,
      closeShipment,
      totalShipment: shipmentNumber.length,
      completed: completeCount,
      pending: pendingCount,
      delivery,
    }
  })
}

export const varianceReportVendor = (trucker: any, deliveries: any) => {
  return trucker.map((vendor) => {
    return deliveries
      .filter((del: any) => del.trucker === vendor)
      .filter((del: any) => del.delvStatus === 'Complete')
      .map((del: any) => {
        let variance = 0
        let items: any = []
        del.items.map((item: any) => {
          const convertVariance = (variance: number, qty: number) => {
            console.log(variance)

            if (variance < 0) {
              return variance * -1
            }
            if (variance > 0) {
              return variance * -1
            }

            return variance
          }
          const qty = item.qty
          const varianceQty = convertVariance(item.varianceQty, item.qty) || 0
          const newVariance = (varianceQty / qty) * 100

          variance = variance + newVariance
          if (item.varianceQty !== 0) {
            items.push({
              id: item.id,
              qty: item.qty,
              varianceQty: item.varianceQty,
              itemNumber: item.itemNumber,
              material: item.material,
              reasonOfVariance: item.reasonOfVariance,
              date: item.deliveryDateAndTime
                ? moment(item.deliveryDateAndTime).format('LL')
                : '',
              time: item.deliveryDateAndTime
                ? moment(item.deliveryDateAndTime).format('LT')
                : '',
              deliveryId: del.id,
            })
          }
        })
        console.log(del.items.length)
        variance = variance != 0 ? variance / del.items.length : 0
        return {
          delivery: del.id,
          variance: variance,
          id: vendor,
          items,
        }
      })
  })
}

export const completeReportCustomer = (customer: any, deliveries: any) => {
  return customer.map((c) => {
    let completeCount = 0
    let pendingCount = 0
    let delivery: any = []
    deliveries
      .filter((x: any) => x.customer.name === c)
      .map((d: any) => {
        if (d.delvStatus === 'Complete') {
          completeCount = completeCount + 1
        } else {
          pendingCount = pendingCount + 1
        }

        const date =
          d.scheduledDate && d.scheduledDate != null
            ? moment(d.scheduledDate).format('LL')
            : ''
        const time = d.scheduledTime
        d.scheduledTime != null ? moment(d.scheduledTime).format('LT') : ''
        delivery.push({ id: d.id, status: d.delvStatus, date, time })
      })
    return {
      customer: c,
      completed: completeCount,
      pending: pendingCount,
      delivery,
    }
  })
}

export const varianceReportCustomer = (customer: any, deliveries: any) => {
  return customer.map((customer) => {
    return deliveries
      .filter(
        (del: any) =>
          del.customer.name === customer && del.delvStatus === 'Complete',
      )
      .map((del: any) => {
        let variance = 0
        let items: any = []
        del.items.map((item: any) => {
          const convertVariance = (variance: number, qty: number) => {
            if (variance < 0) {
              return variance * -1
            }
            if (variance > 0) {
              return variance * -1
            }

            return variance
          }
          const qty = item.qty
          const varianceQty = convertVariance(item.varianceQty, item.qty) || 0
          const newVariance = (varianceQty / qty) * 100

          variance = variance + newVariance

          if (item.varianceQty !== 0) {
            items.push({
              id: item.id,
              qty: item.qty,
              varianceQty: item.varianceQty,
              itemNumber: item.itemNumber,
              material: item.material,
              reasonOfVariance: item.reasonOfVariance,
              date: item.deliveryDateAndTime
                ? moment(item.deliveryDateAndTime).format('LL')
                : '',
              time: item.deliveryDateAndTime
                ? moment(item.deliveryDateAndTime).format('LT')
                : '',
              deliveryId: del.id,
            })
          }
        })

        variance = variance != 0 ? variance / del.items.length : 0
        return {
          delivery: del.id,
          variance: variance,
          id: customer,
          items,
        }
      })
  })
}

export const completeReportShipment = (
  shipmentNumber: Array<String>,
  deliveries: any,
) => {
  return shipmentNumber.map((s) => {
    let completeCount = 0
    let pendingCount = 0
    let delivery: any = []
    let driver
    let trucker
    let porter
    deliveries
      .filter((x: any) => x.shipmentNumber === s)
      .map((d: any) => {
        if (d.delvStatus === 'Complete') {
          completeCount = completeCount + 1
        } else {
          pendingCount = pendingCount + 1
        }
        const date =
          d.scheduledDate && d.scheduledDate != null
            ? moment(d.scheduledDate).format('LL')
            : ''
        const time = d.scheduledTime
        d.scheduledTime != null ? moment(d.scheduledTime).format('LT') : ''

        delivery.push({ id: d.id, status: d.delvStatus, date, time })
        driver = d.driver.name
        trucker = d.trucker
        porter = d.driver.porter
      })
    return {
      shipment: s,
      totalDeliveries: completeCount + pendingCount,
      driver,
      trucker,
      porter,
      completed: completeCount,
      pending: pendingCount,
      delivery,
    }
  })
}

export const varianceReportShipment = (
  shipmentNumber: Array<String>,
  deliveries: any,
) => {
  return shipmentNumber.map((shipment) => {
    return deliveries
      .filter((del: any) => del.shipmentNumber === shipment)
      .filter((del: any) => del.delvStatus === 'Complete')
      .map((del: any) => {
        let variance = 0
        let items: any = []
        del.items.map((item: any) => {
          const convertVariance = (variance: number, qty: number) => {
            if (variance < 0) {
              return variance * -1
            }
            if (variance > 0) {
              return variance * -1
            }

            return variance
          }
          const qty = item.qty
          const varianceQty = convertVariance(item.varianceQty, item.qty) || 0
          const newVariance = (varianceQty / qty) * 100

          variance = variance + newVariance

          if (item.varianceQty !== 0) {
            items.push({
              id: item.id,
              qty: item.qty,
              varianceQty: item.varianceQty,
              itemNumber: item.itemNumber,
              material: item.material,
              reasonOfVariance: item.reasonOfVariance,
              date:
                item.deliveryDateAndTime && item.deliveryDateAndTime != null
                  ? moment(item.deliveryDateAndTime).format('LL')
                  : '',
              time:
                item.deliveryDateAndTime && item.deliveryDateAndTime != null
                  ? moment(item.deliveryDateAndTime).format('LT')
                  : '',
              deliveryId: del.id,
            })
          }
        })

        variance = variance != 0 ? variance / del.items.length : 0
        return {
          delivery: del.id,
          variance: variance,
          id: shipment,
          items,
        }
      })
  })
}

export const fetchDelivery = async (header) => {
  const uri = EPOD_API_URI || 'http://localhost:4000/graphql'
  const link = new HttpLink({ uri })
  const operation = {
    query: gql`
      query {
        allDeliverys {
          id
          scheduledDate
          scheduledTime
          delvStatus
          driver {
            id
            name
            plateNumber
            porter
          }
          items {
            id
            itemNumber
            material
            pricePerUnit
            uom
            qty
            varianceQty
            pricePerUnit
            reasonOfVariance
            deliveryDateAndTime
          }
          customer {
            id
            name
            address {
              id
              building_name
              street
              city
              state
              street
              zip_code
            }
          }
          shipmentNumber
          file {
            id
            path
          }
          trucker
        }
      }
    `,
    variables: {},
    context: {
      headers: {
        //Den auth
        Authorization: header,
        //Mark auth
        //Authorization: "Basic bWFyazoxMjM=",
      },
    },
  }

  const result: any = await makePromise(execute(link, operation))
    .then((data) => data)
    .catch((error) => error)
  return result.data || result.error
}
