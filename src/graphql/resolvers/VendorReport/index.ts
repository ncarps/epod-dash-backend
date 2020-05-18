import {
  completeReportVendor,
  varianceReportVendor,
} from '../../../functions/VendorFunctions'
import { filterByDateRange } from '../../../functions/DateFunctions'

const vendorReportResolver = {
  Query: {
    vendorReport: async (parent, { vendor }, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      const deliveries: any = fetchData.allDeliverys

      const trucker: any = []
      trucker.push(vendor)
      const completeReport = completeReportVendor(trucker, deliveries)
      const varianceReport = varianceReportVendor(trucker, deliveries)

      return completeReport.map((r: any, index) => {
        return {
          vendor: r.vendor,
          closeShipment: r.closeShipment,
          totalShipment: r.totalShipment,
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.vendor,
            delivery: r.delivery,
          },
          varianceReport: varianceReport[index],
          id: r.vendor,
        }
      })[0]
    },

    allVendorReport: async (parent, { dateFrom, dateTo }, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      let deliveries: any = fetchData.allDeliverys

      if (dateFrom || dateTo) {
        deliveries = deliveries.filter((del) => {
          if (filterByDateRange(dateFrom, dateTo, del.scheduledDate)) {
            return del
          }
        })
      }

      const trucker: any = []
      const map = new Map()
      for (const item of deliveries) {
        if (!map.has(item.trucker)) {
          map.set(item.trucker, true)
          trucker.push(item.trucker)
        }
      }

      const completeReport = completeReportVendor(trucker, deliveries)

      const varianceReport = varianceReportVendor(trucker, deliveries)

      return completeReport.map((r: any, index) => {
        return {
          vendor: r.vendor,
          closeShipment: r.closeShipment,
          totalShipment: r.totalShipment,
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.vendor,
            delivery: r.delivery,
          },
          varianceReport: varianceReport[index],
          id: r.vendor,
        }
      })
    },
  },
}

export default vendorReportResolver
