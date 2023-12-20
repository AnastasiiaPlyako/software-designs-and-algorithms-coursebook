import { MarksText } from "../const";
import { Shipment } from "./shipment";

export class ShipmentDecorator extends Shipment {
    ship(): string {
        const baseShipText = super.ship() || '';
        const markText = Shipment.client.typesMarks
            .map(type => `**MARK ${MarksText[type]}**`.toUpperCase()).join('\n') || '';
        return `${baseShipText}\n${markText}`;
    }
}
