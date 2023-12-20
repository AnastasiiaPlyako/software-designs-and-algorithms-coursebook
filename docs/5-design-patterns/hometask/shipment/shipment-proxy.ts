import { Shipment } from "./shipment";
import { Letter, Oversize, Package } from "./shipment-types";

export class ShipmentProxy extends Shipment {
    getShipment() {
        const weight2 = Shipment.client.weight2;
        if (weight2 <= 15) {
            return new Letter();
        }
        if (weight2 <= 160) {
            return new Package();
        }
        if (weight2 > 160) {
            return new Oversize();
        }
    }
}
