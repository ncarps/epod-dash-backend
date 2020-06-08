import {
  noVarianceMaterialReport,
  withVarianceMaterialReport,
  completeReportCustomer,
  varianceReportCustomer,
  materialReportCustomer,
} from '../../../functions/CustomerFunctions'
import { filterByDateRange } from '../../../functions/DateFunctions'
import {
  completeReportShipment,
  varianceReportShipment,
} from '../../../functions/ShipmentFunctions'
import {
  completeReportVendor,
  varianceReportVendor,
} from '../../../functions/VendorFunctions'

const reportResolver = {
  Query: {
    // allShipmentReport: async (parent, { dateFrom, dateTo }, context, info) => {
    //   const { fetchDelivery } = context

    //   const fetchData: any = await fetchDelivery()
    //   let deliveries: Array<any> = fetchData.allDeliverys

    //   if (dateFrom || dateTo) {
    //     deliveries = deliveries.filter((del) => {
    //       if (filterByDateRange(dateFrom, dateTo, del.scheduledDate)) {
    //         return del
    //       }
    //     })
    //   }

    //   const shipmentNumber: Array<String> = []
    //   const map = new Map()
    //   for (const item of deliveries) {
    //     if (!map.has(item.shipmentNumber)) {
    //       map.set(item.shipmentNumber, true)
    //       shipmentNumber.push(item.shipmentNumber)
    //     }
    //   }

    //   const completeReport = completeReportShipment(shipmentNumber, deliveries)

    //   const varianceReport = varianceReportShipment(shipmentNumber, deliveries)

    //   return completeReport.map((r: any, index) => {
    //     return {
    //       shipment: r.shipment,
    //       trucker: r.trucker,
    //       totalDeliveries: r.totalDeliveries,
    //       driver: r.driver,
    //       porter: r.porter,
    //       completeReport: {
    //         completed: r.completed,
    //         pending: r.pending,
    //         id: r.shipment,
    //         delivery: r.delivery,
    //       },
    //       varianceReport: varianceReport[index],
    //       id: r.shipment,
    //     }
    //   })
    // },

    // shipmentReport: async (parent, { shipmentNo }, context, info) => {
    //   const { fetchDelivery } = context

    //   const fetchData: any = await fetchDelivery()
    //   const deliveries: any = fetchData.allDeliverys

    //   const shipmentNumber: Array<String> = []
    //   shipmentNumber.push(shipmentNo)
    //   const completeReport = completeReportShipment(shipmentNumber, deliveries)

    //   const varianceReport = varianceReportShipment(shipmentNumber, deliveries)

    //   return completeReport.map((r: any, index) => {
    //     return {
    //       shipment: r.shipment,
    //       trucker: r.trucker,
    //       totalDeliveries: r.totalDeliveries,
    //       driver: r.driver,
    //       porter: r.porter,
    //       completeReport: {
    //         completed: r.completed,
    //         pending: r.pending,
    //         id: r.shipment,
    //         delivery: r.delivery,
    //       },
    //       varianceReport: varianceReport[index],
    //       id: r.shipment,
    //     }
    //   })[0]
    // },

    // vendorReport: async (parent, { vendor }, context, info) => {
    //   const { fetchDelivery } = context

    //   const fetchData: any = await fetchDelivery()
    //   const deliveries: any = fetchData.allDeliverys

    //   const trucker: any = []
    //   trucker.push(vendor)
    //   const completeReport = completeReportVendor(trucker, deliveries)
    //   const varianceReport = varianceReportVendor(trucker, deliveries)

    //   return completeReport.map((r: any, index) => {
    //     return {
    //       vendor: r.vendor,
    //       closeShipment: r.closeShipment,
    //       totalShipment: r.totalShipment,
    //       completeReport: {
    //         completed: r.completed,
    //         pending: r.pending,
    //         id: r.vendor,
    //         delivery: r.delivery,
    //       },
    //       varianceReport: varianceReport[index],
    //       id: r.vendor,
    //     }
    //   })[0]
    // },

    // allVendorReport: async (parent, { dateFrom, dateTo }, context, info) => {
    //   const { fetchDelivery } = context

    //   const fetchData: any = await fetchDelivery()
    //   let deliveries: any = fetchData.allDeliverys

    //   if (dateFrom || dateTo) {
    //     deliveries = deliveries.filter((del) => {
    //       if (filterByDateRange(dateFrom, dateTo, del.scheduledDate)) {
    //         return del
    //       }
    //     })
    //   }

    //   const trucker: any = []
    //   const map = new Map()
    //   for (const item of deliveries) {
    //     if (!map.has(item.trucker)) {
    //       map.set(item.trucker, true)
    //       trucker.push(item.trucker)
    //     }
    //   }

    //   const completeReport = completeReportVendor(trucker, deliveries)

    //   const varianceReport = varianceReportVendor(trucker, deliveries)

    //   return completeReport.map((r: any, index) => {
    //     return {
    //       vendor: r.vendor,
    //       closeShipment: r.closeShipment,
    //       totalShipment: r.totalShipment,
    //       completeReport: {
    //         completed: r.completed,
    //         pending: r.pending,
    //         id: r.vendor,
    //         delivery: r.delivery,
    //       },
    //       varianceReport: varianceReport[index],
    //       id: r.vendor,
    //     }
    //   })
    // },

    // customerReport: async (parent, { customer }, context, info) => {
    //   const { fetchDelivery } = context

    //   const fetchData: any = await fetchDelivery()
    //   const deliveries: any = fetchData.allDeliverys

    //   const cust: any = []
    //   cust.push(customer)
    //   const id = deliveries.filter((x) => {
    //     if (x.customer.name == customer) {
    //       return x.customer.id
    //     }
    //   })
    //   const completeReport = completeReportCustomer(cust, deliveries)
    //   const varianceReport = varianceReportCustomer(deliveries)

    //   return completeReport.map((r: any, index) => {
    //     return {
    //       customer: r.cust,
    //       completeReport: {
    //         completed: r.completed,
    //         pending: r.pending,
    //         id: r.customer,
    //         delivery: r.delivery,
    //       },
    //       varianceReport: varianceReport[index],
    //       id: id[0].customer.id,
    //     }
    //   })[0]
    // },

    // allCustomerReport: async (parent, { dateFrom, dateTo }, context, info) => {
    //   const { fetchDelivery } = context

    //   const fetchData: any = await fetchDelivery()
    //   let deliveries: any = fetchData.allDeliverys

    //   if (dateFrom || dateTo) {
    //     deliveries = deliveries.filter((del) => {
    //       if (filterByDateRange(dateFrom, dateTo, del.scheduledDate)) {
    //         return del
    //       }
    //     })
    //   }

    //   const materialReport: Array<{
    //     id: String
    //     customer: string
    //     totalReceived: Number
    //     totalVariance: Number
    //     shipment: String
    //   }> = materialReportCustomer(deliveries)
    //   console.log(materialReport)

    //   const varianceReport = varianceReportCustomer(deliveries)

    //   return materialReport.map((mr, index) => ({
    //     id: mr.id,
    //     shipment: mr.shipment,
    //     customer: mr.customer,
    //     delivery: mr.id,
    //     materialReport: {
    //       id: mr.id,
    //       totalReceived: mr.totalReceived,
    //       totalVariance: mr.totalVariance,
    //     },
    //     varianceReport: varianceReport[index],
    //     noVarianceMaterial: noVarianceMaterialReport(
    //       deliveries.filter((d) => d.id === mr.id),
    //     ),
    //     withVarianceMaterial: withVarianceMaterialReport(
    //       deliveries.filter((d) => d.id === mr.id),
    //     ),
    //   }))
    //   // const varianceReport = await varianceReportCustomer(customer, deliveries)
    //   // console.log('Customer', varianceReport)
    //   // return completeReport.map((r: any, index) => {
    //   //   const id = customerId(r.customer)[0].customer.id

    //   //   return {
    //   //     customer: r.customer,
    //   //     completeReport: {
    //   //       completed: r.completed,
    //   //       pending: r.pending,
    //   //       id: r.customer,
    //   //       delivery: r.delivery,
    //   //     },
    //   //     varianceReport: varianceReport[index],
    //   //     id: id,
    //   //   }
    //   // })
    // },

    allDeliverys: async (
      parent,
      { dateFrom, dateTo },
      { fetchDelivery },
      info,
    ) => {
      const fetchData: any = await fetchDelivery()
      let deliveries: any = fetchData.allDeliverys

      if (dateFrom || dateTo) {
        deliveries = deliveries.filter((del) => {
          if (filterByDateRange(dateFrom, dateTo, del.scheduledDate)) {
            return del
          }
        })
      }

      console.log('Deliveries', deliveries)
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
        plateNumber: del.driver.plateNumber,
        helper: del.driver.porter,
        fullAddress: del.customer.address.fullAddress,
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
