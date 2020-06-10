const driverResolvers = {
  Query: {
    allDrivers: async (parent, args, context, info) => {
      const { fetchDriver } = context
      const fetchData: any = await fetchDriver()
      let driver: any = fetchData.allDrivers

      return driver.map((i) => ({
        id: i.id,
        name: i.name,
        plateNumber: i.plateNumber,
        porter: i.porter,
      }))
    },
  },
}

export default driverResolvers
