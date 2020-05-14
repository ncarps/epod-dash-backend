import moment from 'moment'

const reportResolver = {
  Query: {
    allShipmentReport: async (parent, { dateFrom, dateTo }, context, info) => {
      const {
        completeReportShipment,
        varianceReportShipment,
        fetchDelivery,
      } = context

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

      const completeReport = await completeReportShipment(
        shipmentNumber,
        deliveries,
      )

      const varianceReport = await varianceReportShipment(
        shipmentNumber,
        deliveries,
      )

      return completeReport.map((r: any, index) => {
        return {
          shipment: r.shipment,
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
      const {
        completeReportShipment,
        varianceReportShipment,
        fetchDelivery,
      } = context

      const fetchData: any = await fetchDelivery()
      const deliveries: any = fetchData.allDeliverys

      const shipmentNumber: Array<String> = []
      shipmentNumber.push(shipmentNo)
      const completeReport = await completeReportShipment(
        shipmentNumber,
        deliveries,
      )

      const varianceReport = await varianceReportShipment(
        shipmentNumber,
        deliveries,
      )

      return completeReport.map((r: any, index) => {
        return {
          shipment: r.shipment,
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

    vendorReport: async (parent, { vendor }, context, info) => {
      const {
        completeReportVendor,
        varianceReportVendor,
        fetchDelivery,
      } = context

      const fetchData: any = await fetchDelivery()
      const deliveries: any = fetchData.allDeliverys

      const trucker: any = []
      trucker.push(vendor)
      const completeReport = await completeReportVendor(trucker, deliveries)
      const varianceReport = await varianceReportVendor(trucker, deliveries)

      return completeReport.map((r: any, index) => {
        return {
          vendor: r.vendor,
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
      const {
        completeReportVendor,
        varianceReportVendor,
        fetchDelivery,
      } = context

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

      const completeReport = await completeReportVendor(trucker, deliveries)

      const varianceReport = await varianceReportVendor(trucker, deliveries)

      return completeReport.map((r: any, index) => {
        return {
          vendor: r.vendor,
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

    customerReport: async (parent, { customer }, context, info) => {
      const {
        completeReportCustomer,
        varianceReportCustomer,
        fetchDelivery,
      } = context

      const fetchData: any = await fetchDelivery()
      const deliveries: any = fetchData.allDeliverys

      const cust: any = []
      cust.push(customer)
      const id = deliveries.filter((x) => {
        if (x.customer.name == customer) {
          return x.customer.id
        }
      })
      const completeReport = await completeReportCustomer(cust, deliveries)
      const varianceReport = await varianceReportCustomer(cust, deliveries)

      return completeReport.map((r: any, index) => {
        return {
          customer: r.cust,
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.customer,
            delivery: r.delivery,
          },
          varianceReport: varianceReport[index],
          id: id[0].customer.id,
        }
      })[0]
    },

    allCustomerReport: async (parent, { dateFrom, dateTo }, context, info) => {
      const {
        completeReportCustomer,
        varianceReportCustomer,
        fetchDelivery,
      } = context

      const fetchData: any = await fetchDelivery()
      let deliveries: any = fetchData.allDeliverys

      if (dateFrom || dateTo) {
        deliveries = deliveries.filter((del) => {
          if (filterByDateRange(dateFrom, dateTo, del.scheduledDate)) {
            return del
          }
        })
      }

      const customer: any = []
      const map = new Map()
      for (const item of deliveries) {
        if (!map.has(item.customer.name)) {
          map.set(item.customer.name, true)
          customer.push(item.customer.name)
        }
      }
      const customerId = (name) => {
        return deliveries.filter((x) => {
          if (x.customer.name == name) {
            return x.customer.id
          }
        })
      }
      const completeReport = await completeReportCustomer(customer, deliveries)
      const varianceReport = await varianceReportCustomer(customer, deliveries)
      console.log('Customer', varianceReport)
      return completeReport.map((r: any, index) => {
        const id = customerId(r.customer)[0].customer.id

        return {
          customer: r.customer,
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.customer,
            delivery: r.delivery,
          },
          varianceReport: varianceReport[index],
          id: id,
        }
      })
    },

    allDeliverys: async (parent, args, { fetchDelivery }, info) => {
      const fetchData: any = await fetchDelivery()
      const deliveries: any = fetchData.allDeliverys

      return deliveries.map((del) => ({
        customer: del.customer.name,
        driver: del.driver.name,
        file: del.file ? del.file.map((f) => f.path) : null,
        id: del.id,
        items: del.items.map((i) => ({
          id: i.id,
          itemNumber: i.itemNumber,
          material: i.material,
          pricePerUnit: i.pricePerUnit,
          uom: i.uom,
          qty: i.qty,
          varianceQty: i.varianceQty,
          reasonOfVariance: i.reasonOfVariance,
          deliveryDateAndTime: i.deliveryDateAndTime,
        })),
        deliveryStatus: del.delvStatus,
        scheduledDate: del.scheduledDate,
        scheduledTime: del.scheduledTime,
        shipmentNumber: del.shipmentNumber,
        trucker: del.trucker,
      }))
    },
    loginAuth: async (parent, { userBase }, context, info) => {
      //      console.log(userBase);
      //      if (userBase === "TU5hYmFibGl0OjEyMw==") {
      //        return { success: true, message: "Logged In" };
      //      }
      //
      //      return { success: false, message: "Wrong Credentials" };
      //    }

      //should not throw?, for login in client purposes? find a workaround

      const { user } = context
      if (user.id && user.username) {
        return { success: true, message: 'Authenticated.' }
      }
      return { success: false, message: 'Invalid Credentials.' }
    },
  },
}

export default reportResolver

const filterByDateRange = (dateFrom, dateTo, deliveryDate) => {
  const inputDateFrom = dateFrom ? moment(dateFrom).format('LL') : undefined
  const inputDateTo = dateTo ? moment(dateTo).format('LL') : undefined
  const inputDeliveryDate = moment(deliveryDate).format('LL')
  console.log('Input Dates', inputDateFrom, inputDateTo, inputDeliveryDate)
  if (dateFrom && dateTo) {
    if (
      moment(inputDeliveryDate).isSame(inputDateFrom) ||
      moment(inputDeliveryDate).isSame(inputDateTo)
    ) {
      return true
    }
    if (
      moment(inputDeliveryDate).isAfter(inputDateFrom) &&
      moment(inputDeliveryDate).isBefore(inputDateTo)
    ) {
      return true
    }

    return false
  }

  if (dateTo) {
    if (moment(inputDeliveryDate).isSame(inputDateTo)) {
      return true
    }
    if (moment(inputDeliveryDate).isBefore(inputDateTo)) {
      return true
    }
    return false
  }

  if (dateFrom) {
    console.log('3rd condition')
    if (moment(inputDeliveryDate).isSame(inputDateFrom)) {
      return true
    }
    if (moment(inputDeliveryDate).isAfter(inputDateFrom)) {
      return true
    }
    return false
  }

  return false
}
