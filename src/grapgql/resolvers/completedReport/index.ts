const reportResolver = {
  Query: {
    allShipmentReport: async (parent, args, context, info) => {
      const { fetch } = context;
      console.log(fetch);
    },

    shipmentReport: async (parent, args, context, info) => {},

    vendorReport: async (parent, args, context, info) => {},

    allVendorReport: async (parent, args, context, info) => {},

    customerReport: async (parent, args, context, info) => {},

    allCustomerReport: async (parent, args, context, info) => {},
  },
};

export default reportResolver;
