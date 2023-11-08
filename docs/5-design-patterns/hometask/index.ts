import { Shipment } from "./shipment/shipment";
import { ShipmentProxy } from "./shipment/shipment-proxy";
import { ShipmentDecorator } from "./shipment/shipment-decorator";

console.log('\n---STEP 1, 2---\n');
const shipment = new Shipment();
const item = shipment.getInstance();
console.log('Client: ', item);
console.log(shipment.ship());

console.log('\n---STEP 3---\n');
const shipmentProxy = new ShipmentProxy().getShipment();
console.log(shipmentProxy.ship())

console.log('\n---STEP 4---\n');
const shipmentDecorator = new ShipmentDecorator();
console.log(shipmentDecorator.ship());



