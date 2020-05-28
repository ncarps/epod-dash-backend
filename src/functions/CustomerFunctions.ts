import moment from 'moment'

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

export const noVarianceMaterialReport = (deliveries: any) => {
  let material: Array<{
    id: String
    itemNumber: String
    material: String
    uom: String
    qty: String
  }> = []
  deliveries.map((del) => {
    del.items.map((i) => {
      if (i.varianceQty === 0) {
        material.push({
          id: i.id,
          itemNumber: i.itemNumber,
          material: i.material,
          uom: i.uom,
          qty: i.qty,
        })
      }
    })
  })
  return material
}

export const withVarianceMaterialReport = (deliveries: any) => {
  let material: Array<{
    id: String
    itemNumber: String
    material: String
    uom: String
    qty: String
  }> = []
  deliveries.map((del) => {
    del.items.map((i) => {
      if (i.varianceQty > 0 || i.varianceQty < 0) {
        material.push({
          id: i.id,
          itemNumber: i.itemNumber,
          material: i.material,
          uom: i.uom,
          qty: i.qty,
        })
      }
    })
  })
  return material
}

export const materialReportCustomer = (deliveries: any) => {
  return deliveries
    .filter((del) => del.delvStatus === 'Complete')
    .map((d) => {
      let totalVariance = 0
      let totalQuantity = 0
      d.items.map((i) => {
        totalVariance = totalVariance + parseFloat(i.varianceQty)
        totalQuantity = totalQuantity + parseFloat(i.qty)
      })
      return {
        id: d.id,
        totalReceived: totalQuantity + totalVariance,
        totalVariance: totalVariance * -1,
        customer: d.customer.name,
        shipment: d.shipmentNumber,
      }
    })
}

export const varianceReportCustomer = (deliveries: any) => {
  return deliveries
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
        id: del.id,
        items,
      }
    })
}
