import { gql } from 'apollo-server'

const driverLocationtypeDefs = gql`
  type DriverLocation {
    id: ID
    timeStamp: String
    driverId: String
    latitude: Float
    longitude: Float
    mobileTimeStamp: String
    mobileMocked: Boolean
    textAddress: String
  }

  type Query {
    getDriverLocations(driverId: String): DriverLocation
  }
`

export default driverLocationtypeDefs
