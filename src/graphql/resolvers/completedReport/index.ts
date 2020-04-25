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
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.shipment,
          },
          varianceReport: varianceReport[index],
          id: r.shipment,
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
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.shipment,
          },
          varianceReport: varianceReport[index],
          id: r.shipment,
        };
      })[0];
    },

    vendorReport: async (parent, { vendor }, context, info) => {
      const {
        completeReportVendor,
        varianceReportVendor,
        fetchDelivery,
      } = context;

      const fetchData: any = await fetchDelivery();
      const deliveries: any = fetchData.allDeliverys;

      const trucker: any = [];
      trucker.push(vendor);
      const completeReport = completeReportVendor(trucker, deliveries);
      console.log(completeReport);
      const varianceReport = varianceReportVendor(trucker, deliveries);

      return completeReport.map((r: any, index) => {
        return {
          vendor: r.vendor,
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.vendor,
          },
          varianceReport: varianceReport[index],
          id: r.vendor,
        };
      })[0];
    },

    allVendorReport: async (parent, args, context, info) => {
      const {
        completeReportVendor,
        varianceReportVendor,
        fetchDelivery,
      } = context;

      const fetchData: any = await fetchDelivery();
      const deliveries: any = fetchData.allDeliverys;

      const trucker: any = [];
      const map = new Map();
      for (const item of deliveries) {
        if (!map.has(item.trucker)) {
          map.set(item.trucker, true);
          trucker.push(item.trucker);
        }
      }
      console.log(trucker);
      const completeReport = completeReportVendor(trucker, deliveries);
      console.log(completeReport);
      const varianceReport = varianceReportVendor(trucker, deliveries);
      console.log(varianceReport);
      return completeReport.map((r: any, index) => {
        return {
          vendor: r.vendor,
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.vendor,
          },
          varianceReport: varianceReport[index],
          id: r.vendor,
        };
      });
    },

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
      const id = deliveries.filter((x) => {
        if (x.customer.name == customer) {
          return x.customer.id;
        }
      });
      const completeReport = completeReportCustomer(cust, deliveries);
      const varianceReport = varianceReportCustomer(cust, deliveries);

      return completeReport.map((r: any, index) => {
        return {
          customer: r.cust,
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.customer,
          },
          varianceReport: varianceReport[index],
          id: id[0].customer.id,
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
      const customerId = (name) => {
        return deliveries.filter((x) => {
          if (x.customer.name == name) {
            return x.customer.id;
          }
        });
      };
      const completeReport = completeReportCustomer(customer, deliveries);
      const varianceReport = varianceReportCustomer(customer, deliveries);
      return completeReport.map((r: any, index) => {
        const id = customerId(r.customer)[0].customer.id;
        console.log(id);
        return {
          customer: r.customer,
          completeReport: {
            completed: r.completed,
            pending: r.pending,
            id: r.customer,
          },
          varianceReport: varianceReport[index],
          id: id,
        };
      });
    },

    allDeliverys: async (parent, args, { fetchDelivery }, info) => {
      const fetchData: any = await fetchDelivery();
      const deliveries: any = fetchData.allDeliverys;

      return deliveries.map((del) => ({
        customer: del.customer.name,
        driver: del.driver.name,
        file: del.file ? del.file.map((f) => f.path) : null,
        id: del.id,
        items: del.items.map((i) => ({
          id: i.id,
          itemNumber: i.itemNumber,
          material: i.material,
          pricePerUnit: i.pricePerUnit,
          uom: i.uom,
          qty: i.qty,
          varianceQty: i.varianceQty,
          reasonOfVariance: i.varianceQty,
          deliveryDateAndTime: i.deliveryDateAndTime,
        })),
        deliveryStatus: del.delvStatus,
        scheduledDate: del.scheduledDate,
        scheduledTime: del.scheduledTime,
        shipmentNumber: del.shipmentNumber,
        trucker: del.trucker,
      }));
    },
  },
};

export default reportResolver;
