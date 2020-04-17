const reportResolver = {
  Query: {
    allShipmentReport: async (parent, args, context, info) => {
      const { fetch, completeReportShipment, varianceReportShipment } = context;

      const fetchData: any = await fetch({
        query: `query{
                allDeliverys{
                  id
                  scheduledDate
                  scheduledTime
                  delvStatus
                  driver{
                    id
                    name
                    plateNumber
                  }
                  items{
                    id
                    itemNumber
                    material
                    pricePerUnit
                    uom
                    qty
                    varianceQty
                    pricePerUnit
                  }
                  customer{
                    id
                    name
                    address{
                      id
                      building_name
                      street
                      city
                      state
                      street
                      zip_code
                    }
                  }
                  shipmentNumber
                  file{
                     id
                    path
                  }
                }
              }`,
        variables: {},
      }).then((res: any) => {
        return res.data;
      });
      const deliveries: any = fetchData.allDeliverys;

      const shipmentNumber: Array<{
        shipment: String;
        delivery: String;
        status: String;
      }> = [];
      const map = new Map();
      for (const item of deliveries) {
        if (!map.has(item.shipmentNumber)) {
          map.set(item.shipmentNumber, true);
          shipmentNumber.push({
            shipment: item.shipmentNumber,
            delivery: item.id,
            status: item.delvStatus,
          });
        }
      }
      console.log(shipmentNumber);
      const completeReport = completeReportShipment(shipmentNumber, deliveries);
      console.log(completeReport);
      const varianceReport = varianceReportShipment(shipmentNumber, deliveries);

      return completeReport.map((r: any) => {
        return {
          shipment: r.shipment,
          completeReport: { completed: r.completed, pending: r.pending },
          varianceReport: [],
        };
      });
    },

    shipmentReport: async (parent, args, context, info) => {},

    vendorReport: async (parent, args, context, info) => {},

    allVendorReport: async (parent, args, context, info) => {},

    customerReport: async (parent, args, context, info) => {},

    allCustomerReport: async (parent, args, context, info) => {},
  },
};

export default reportResolver;
