const driverLocationResolvers = {
  Query: {
    getDriverLocations: async (parent, { driverId }, context, info) => {
      const { fetchDriverLocation } = context
      const fetchLocation: any = await fetchDriverLocation()
      const driverLocations = fetchLocation.getDriverLocations
      const filteredLoc = driverLocations.filter(
        (loc) => (loc.driverId = driverId),
      )

      return filteredLoc[filteredLoc.length - 1] || {}
    },
  },
}

export default driverLocationResolvers
