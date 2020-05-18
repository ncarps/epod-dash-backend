import moment from 'moment'

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
