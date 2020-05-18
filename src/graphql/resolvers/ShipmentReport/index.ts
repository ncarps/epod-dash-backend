import { filterByDateRange } from '../../../functions/DateFunctions'
import {
  completeReportShipment,
  varianceReportShipment,
} from '../../../functions/ShipmentFunctions'

const shipmentReportResolver = {
  Query: {
    allShipmentReport: async (parent, { dateFrom, dateTo }, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      let deliveries: Array<any> = fetchData.allDeliverys

      if (dateFrom || dateTo) {
        deliveries = deliveries.filter((del) => {
          if (filterByDateRange(dateFrom, dateTo, del.scheduledDate)) {
            return del
          }
        })
      }

      const shipmentNumber: Array<String> = []
      const map = new Map()
      for (const item of deliveries) {
        if (!map.has(item.shipmentNumber)) {
          map.set(item.shipmentNumber, true)
          shipmentNumber.push(item.shipmentNumber)
        }
      }

      const completeReport = completeReportShipment(shipmentNumber, deliveries)

      const varianceReport = varianceReportShipment(shipmentNumber, deliveries)

      return completeReport.map((r: any, index) => {
        return {
          shipment: r.shipment,
          trucker: r.trucker,
          totalDeliveries: r.totalDeliveries,
          driver: r.driver,
          porter: r.porter,
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.shipment,
            delivery: r.delivery,
          },
          varianceReport: varianceReport[index],
          id: r.shipment,
        }
      })
    },

    shipmentReport: async (parent, { shipmentNo }, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      const deliveries: any = fetchData.allDeliverys

      const shipmentNumber: Array<String> = []
      shipmentNumber.push(shipmentNo)
      const completeReport = completeReportShipment(shipmentNumber, deliveries)

      const varianceReport = varianceReportShipment(shipmentNumber, deliveries)

      return completeReport.map((r: any, index) => {
        return {
          shipment: r.shipment,
          trucker: r.trucker,
          totalDeliveries: r.totalDeliveries,
          driver: r.driver,
          porter: r.porter,
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.shipment,
            delivery: r.delivery,
          },
          varianceReport: varianceReport[index],
          id: r.shipment,
        }
      })[0]
    },
  },
}

export default shipmentReportResolver
