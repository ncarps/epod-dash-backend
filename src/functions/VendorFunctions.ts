import moment from 'moment'

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
