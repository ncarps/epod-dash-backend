export const getCompleteShipment = (
  shipmentNumber: String,
  deliveries: any,
) => {
  let pendingCount = 0
  deliveries
    .filter((d) => d.shipmentNumber === shipmentNumber)
    .map((del) => {
      if (del.delvStatus === 'Complete') {
      } else {
        pendingCount = pendingCount + 1
      }
    })

  console.log(pendingCount)
  console.log(shipmentNumber)
  console.log(deliveries)
  if (pendingCount > 0) {
    return false
  } else {
    return true
  }
}
