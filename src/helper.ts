const { createApolloFetch } = require('apollo-fetch')
import { execute, makePromise } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
const { EPOD_API_URI } = process.env

require('dotenv').config()

export const fetchEpodServer = createApolloFetch({
  uri: EPOD_API_URI || 'http://localhost:4000/graphql',
})

export const fetchDelivery = async (header) => {
  const uri = EPOD_API_URI || 'http://localhost:4000/graphql'
  const link = new HttpLink({ uri })
  const operation = {
    query: gql`
      query {
        allDeliverys {
          id
          scheduledDate
          scheduledTime
          delvStatus
          driver {
            id
            name
            plateNumber
            porter
          }
          items {
            id
            itemNumber
            material
            pricePerUnit
            uom
            qty

            pricePerUnit
            variance {
              id
              varianceQty
              reasonOfVariance
            }

            deliveryDateAndTime
          }
          customer {
            id
            name
            address {
              id
              building_name
              street
              city
              state
              street
              zip_code
            }
          }
          shipmentNumber
          file {
            id
            path
          }
          trucker
        }
      }
    `,
    variables: {},
    context: {
      headers: {
        //Den auth
        Authorization: header,
        //Mark auth
        //Authorization: "Basic bWFyazoxMjM=",
      },
    },
  }

  const result: any = await makePromise(execute(link, operation))
    .then((data) => data)
    .catch((error) => error)
  if (result.data) {
    const deliverys = result.data.allDeliverys.map((d) => {
      const items = d.items.map((i) => {
        let totalVariance: number = 0
        const reasonOfVariance =
          i.variance.length > 0 ? i.variance[0].reasonOfVariance : ''
        i.variance.map((v) => {
          totalVariance = v.varianceQty + totalVariance
          console.log('reason', v.reasonOfVariance)
        })
        console.log('Total Variance', totalVariance)

        return { ...i, reasonOfVariance, varianceQty: totalVariance }
      })

      return { ...d, items }
    })

    return { allDeliverys: deliverys }
  }

  return result.error
}

export const fetchDriver = async (header) => {
  const uri = EPOD_API_URI || 'http://localhost:4000/graphql'
  const link = new HttpLink({ uri })
  const operation = {
    query: gql`
      query {
        allDrivers {
          id
          name
          plateNumber
          porter
        }
      }
    `,
    variables: {},
    context: {
      headers: {
        //Den auth
        Authorization: header,
        //Mark auth
        //Authorization: "Basic bWFyazoxMjM=",
      },
    },
  }

  const result: any = await makePromise(execute(link, operation))
    .then((data) => data)
    .catch((error) => error)
  return result.data || result.error
}

export const fetchDriverLocation = async (header) => {
  const uri = EPOD_API_URI || 'http://localhost:4000/graphql'
  const link = new HttpLink({ uri })
  const operation = {
    query: gql`
      query {
        getDriverLocations {
          id
          timeStamp
          driverId
          latitude
          longitude
          mobileTimeStamp
          mobileMocked
          textAddress
        }
      }
    `,
    variables: {},
    context: {
      headers: {
        //Den auth
        Authorization: header,
        //Mark auth
        //Authorization: "Basic bWFyazoxMjM=",
      },
    },
  }

  const result: any = await makePromise(execute(link, operation))
    .then((data) => data)
    .catch((error) => error)
  return result.data || result.error
}
