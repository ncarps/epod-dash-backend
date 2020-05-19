import { makeFilterDeliveryByDate } from '../../../functions/DateFunctions'
import { getCompleteShipment } from '../../../functions/DashboardShipment'

const dashReportResolver = {
  Query: {
    shipmentStatus: async (parent, args, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      let deliveries: Array<any> = fetchData.allDeliverys
      let completeCount = 0
      let pendingCount = 0

      deliveries = deliveries.filter((d) =>
        makeFilterDeliveryByDate(d.scheduledDate, 0),
      )

      const shipmentNumber: Array<String> = []
      const map = new Map()
      for (const item of deliveries) {
        if (!map.has(item.shipmentNumber)) {
          map.set(item.shipmentNumber, true)
          shipmentNumber.push(item.shipmentNumber)
        }
      }
      shipmentNumber.map((s) => {
        const completed = getCompleteShipment(s, deliveries)
        if (completed) {
          completeCount = completeCount + 1
        } else {
          pendingCount = pendingCount + 1
        }
      })
      return {
        id: '1',
        complete: completeCount,
        pending: pendingCount,
      }
    },
    deliveryStatus: async (parent, args, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      let deliveries: Array<any> = fetchData.allDeliverys
      let completeCount = 0
      let pendingCount = 0

      deliveries = deliveries
        .filter((d) => makeFilterDeliveryByDate(d.scheduledDate, 0))
        .map((del) => {
          if (del.delvStatus === 'Complete') {
            completeCount = completeCount + 1
          } else {
            pendingCount = pendingCount + 1
          }
        })
      return {
        id: '1',
        complete: completeCount,
        pending: pendingCount,
      }
    },
  },
}

export default dashReportResolver
