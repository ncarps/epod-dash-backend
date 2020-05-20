import { makeFileterShipmentAge } from '../../../functions/DateFunctions'
import { getAgeShipment } from '../../../functions/ShipmentFunctions'

const shipmentAgeResolver = {
  Query: {
    shipmentAge: async (parent, args, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      let deliveries: Array<any> = fetchData.allDeliverys
      let filteredDeliveries

      filteredDeliveries = deliveries.filter(
        (d) =>
          makeFileterShipmentAge(d.scheduledDate, 0) &&
          d.delvStatus === 'Pending',
      )

      const shipmentNumber: Array<String> = []
      const map = new Map()
      for (const item of filteredDeliveries) {
        if (!map.has(item.shipmentNumber)) {
          map.set(item.shipmentNumber, true)
          shipmentNumber.push(item.shipmentNumber)
        }
      }
      return getAgeShipment(shipmentNumber, deliveries)
    },
  },
}

export default shipmentAgeResolver
