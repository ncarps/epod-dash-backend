import { makeFilterDeliveryByDate } from '../../../functions/DateFunctions'
import { makeFillRate } from '../../../functions/FillRateFunctions'
import { VendorFillRate, CustomerFillRate } from '../../../types/types'

const fillRateResolver = {
  Query: {
    sevenDaysFillRate: async (parent, args, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      let deliveries: Array<any> = fetchData.allDeliverys

      deliveries = deliveries.filter(
        (d) =>
          makeFilterDeliveryByDate(d.scheduledDate, 7) &&
          d.delvStatus === 'Complete',
      )

      const fillRate: {
        vendor: Array<VendorFillRate>
        customer: Array<CustomerFillRate>
      } = makeFillRate(deliveries, 'sevenDaysFillRate')

      return {
        id: 'sevenDaysFillRate',
        vendor: fillRate.vendor,
        customer: fillRate.customer,
      }
    },
    oneMonthFillRate: async (parent, args, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      let deliveries: Array<any> = fetchData.allDeliverys

      deliveries = deliveries.filter(
        (d) =>
          makeFilterDeliveryByDate(d.scheduledDate, 30) &&
          d.delvStatus === 'Complete',
      )

      const fillRate: {
        vendor: Array<VendorFillRate>
        customer: Array<CustomerFillRate>
      } = makeFillRate(deliveries, 'oneMonthFillRate')

      return {
        id: 'oneMonthFillRate',
        vendor: fillRate.vendor,
        customer: fillRate.customer,
      }
    },
    oneYearFillRate: async (parent, args, context, info) => {
      const { fetchDelivery } = context

      const fetchData: any = await fetchDelivery()
      let deliveries: Array<any> = fetchData.allDeliverys

      deliveries = deliveries.filter(
        (d) =>
          makeFilterDeliveryByDate(d.scheduledDate, 365) &&
          d.delvStatus === 'Complete',
      )
      const fillRate: {
        vendor: Array<VendorFillRate>
        customer: Array<CustomerFillRate>
      } = makeFillRate(deliveries, 'oneYearFillRate')

      return {
        id: 'oneYearFillRate',
        vendor: fillRate.vendor,
        customer: fillRate.customer,
      }
    },
  },
}

export default fillRateResolver
