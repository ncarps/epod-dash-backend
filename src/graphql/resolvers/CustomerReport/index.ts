import {
  noVarianceMaterialReport,
  withVarianceMaterialReport,
  completeReportCustomer,
  varianceReportCustomer,
  materialReportCustomer,
} from '../../../functions/CustomerFunctions'
import { filterByDateRange } from '../../../functions/DateFunctions'

const customerReportResolver = {
  Query: {
    customerReport: async (parent, { customer }, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      const deliveries: any = fetchData.allDeliverys

      const cust: any = []
      cust.push(customer)
      const id = deliveries.filter((x) => {
        if (x.customer.name == customer) {
          return x.customer.id
        }
      })
      const completeReport = completeReportCustomer(cust, deliveries)
      const varianceReport = varianceReportCustomer(deliveries)

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

      const materialReport: Array<{
        id: String
        customer: string
        totalReceived: Number
        totalVariance: Number
        shipment: String
      }> = materialReportCustomer(deliveries)
      console.log(materialReport)

      const varianceReport = varianceReportCustomer(deliveries)

      return materialReport.map((mr, index) => ({
        id: mr.id,
        shipment: mr.shipment,
        customer: mr.customer,
        delivery: mr.id,
        materialReport: {
          id: mr.id,
          totalReceived: mr.totalReceived,
          totalVariance: mr.totalVariance,
        },
        varianceReport: varianceReport[index],
        noVarianceMaterial: noVarianceMaterialReport(
          deliveries.filter((d) => d.id === mr.id),
        ),
        withVarianceMaterial: withVarianceMaterialReport(
          deliveries.filter((d) => d.id === mr.id),
        ),
      }))
      // const varianceReport = await varianceReportCustomer(customer, deliveries)
      // console.log('Customer', varianceReport)
      // return completeReport.map((r: any, index) => {
      //   const id = customerId(r.customer)[0].customer.id

      //   return {
      //     customer: r.customer,
      //     completeReport: {
      //       completed: r.completed,
      //       pending: r.pending,
      //       id: r.customer,
      //       delivery: r.delivery,
      //     },
      //     varianceReport: varianceReport[index],
      //     id: id,
      //   }
      // })
    },
  },
}

export default customerReportResolver
