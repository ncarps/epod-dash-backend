import { gql } from 'apollo-server'

const driverLocationtypeDefs = gql`
  type DriverLocation {
    id: ID!
    timeStamp: String
    driverId: String
    latitude: Float
    longitude: Float
  }

  type Query {
    allDriverLocations: [DriverLocation]
  }
`

export default driverLocationtypeDefs
