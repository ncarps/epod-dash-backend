const reportResolver = {
  Query: {
    allShipmentReport: async (parent, args, context, info) => {
      const {
        completeReportShipment,
        varianceReportShipment,
        fetchDelivery,
      } = context;

      const fetchData: any = await fetchDelivery();
      const deliveries: any = fetchData.allDeliverys;

      const shipmentNumber: Array<String> = [];
      const map = new Map();
      for (const item of deliveries) {
        if (!map.has(item.shipmentNumber)) {
          map.set(item.shipmentNumber, true);
          shipmentNumber.push(item.shipmentNumber);
        }
      }
      console.log(shipmentNumber);
      const completeReport = completeReportShipment(shipmentNumber, deliveries);
      console.log(completeReport);
      const varianceReport = varianceReportShipment(shipmentNumber, deliveries);
      console.log(varianceReport);
      return completeReport.map((r: any, index) => {
        return {
          shipment: r.shipment,
          completeReport: { completed: r.completed, pending: r.pending },
          varianceReport: varianceReport[index],
        };
      });
    },

    shipmentReport: async (parent, { shipmentNo }, context, info) => {
      const {
        completeReportShipment,
        varianceReportShipment,
        fetchDelivery,
      } = context;

      const fetchData: any = await fetchDelivery();
      const deliveries: any = fetchData.allDeliverys;

      const shipmentNumber: Array<String> = [];
      shipmentNumber.push(shipmentNo);
      const completeReport = completeReportShipment(shipmentNumber, deliveries);
      console.log(completeReport);
      const varianceReport = varianceReportShipment(shipmentNumber, deliveries);

      return completeReport.map((r: any, index) => {
        return {
          shipment: r.shipment,
          completeReport: { completed: r.completed, pending: r.pending },
          varianceReport: varianceReport[index],
        };
      })[0];
    },

    vendorReport: async (parent, args, context, info) => {},

    allVendorReport: async (parent, args, context, info) => {},

    customerReport: async (parent, { customer }, context, info) => {
      const {
        completeReportCustomer,
        varianceReportCustomer,
        fetchDelivery,
      } = context;

      const fetchData: any = await fetchDelivery();
      const deliveries: any = fetchData.allDeliverys;

      const cust: any = [];
      cust.push(customer);
      const completeReport = completeReportCustomer(cust, deliveries);
      console.log(completeReport, "completeReport");
      const varianceReport = varianceReportCustomer(cust, deliveries);

      return completeReport.map((r: any, index) => {
        return {
          customer: r.cust,
          completeReport: { completed: r.completed, pending: r.pending },
          varianceReport: varianceReport[index],
        };
      })[0];
    },

    allCustomerReport: async (parent, args, context, info) => {
      const {
        completeReportCustomer,
        varianceReportCustomer,
        fetchDelivery,
      } = context;

      const fetchData: any = await fetchDelivery();
      const deliveries: any = fetchData.allDeliverys;

      const customer: any = [];
      const map = new Map();
      for (const item of deliveries) {
        if (!map.has(item.customer.name)) {
          map.set(item.customer.name, true);
          customer.push(item.customer.name);
        }
      }
      console.log(customer);
      const completeReport = completeReportCustomer(customer, deliveries);
      console.log(completeReport);
      const varianceReport = varianceReportCustomer(customer, deliveries);
      console.log(varianceReport);
      return completeReport.map((r: any, index) => {
        return {
          customer: r.customer,
          completeReport: { completed: r.completed, pending: r.pending },
          varianceReport: varianceReport[index],
        };
      });
    },
  },
};

export default reportResolver;
