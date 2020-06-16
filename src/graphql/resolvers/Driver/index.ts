const driverResolvers = {
  Query: {
    allDrivers: async (parent, args, context, info) => {
      const { fetchDriver, fetchDriverLocation } = context
      const fetchData: any = await fetchDriver()
      let driver: any = fetchData.allDrivers
      const fetchLocation: any = await fetchDriverLocation()
      const driverLocations = fetchLocation.getDriverLocations

      if (driverLocations === null) {
        return {}
      }

      const functionzx = (driverId) => {
        const filteredLoc = driverLocations.filter(
          (loc) => (loc.driverId = driverId),
        )

        return filteredLoc[filteredLoc.length - 1] || {}
      }
      return driver.map((i) => ({
        id: i.id,
        name: i.name,
        plateNumber: i.plateNumber,
        porter: i.porter,
        location: functionzx(i.id),
      }))
    },

    getDriver: async (parent, { driverId }, context, info) => {
      const { fetchDriver, fetchDriverLocation } = context
      const fetchData: any = await fetchDriver()
      let driver: any = fetchData.allDrivers
      const fetchLocation: any = await fetchDriverLocation()
      const driverLocations = fetchLocation.getDriverLocations

      if (driverLocations === null) {
        return {}
      }

      const filteredDriver = driver.find((driv) => driv.id === driverId)

      const filteredLoc = driverLocations.filter(
        (loc) => (loc.driverId = driverId),
      )
      let location: any = filteredLoc[filteredLoc.length - 1] || {}

      return { ...filteredDriver, location: location }
    },
  },
}

export default driverResolvers
