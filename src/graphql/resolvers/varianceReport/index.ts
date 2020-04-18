const varianceReportResolvers = {
  Query: {
    allVarianceReport: async (
      parent: any,
      args: any,
      context: any,
      info: any
    ) => {
      const allReport = await context.deliveryAPI.getAllDeliveries();
    },
    varianceReport: async (parent, args, context, info) => {},
  },
};

export default varianceReportResolvers;
