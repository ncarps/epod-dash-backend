const driverLocationResolvers = {
  Query: {
    allDriverLocations: async (parent, args, context, info) => {
      const { fetchDriverLocation } = context
      const fetchData: any = await fetchDriverLocation()
      let driverLocation: any = fetchData.allDriverLocations

      return driverLocation.map((i) => ({
        id: i.id,
        timeStamp: i.timeStamp,
        driverId: i.driverId,
        latitude: i.latitude,
        longitude: i.longitude,
      }))
    },
  },
}

export default driverLocationResolvers
