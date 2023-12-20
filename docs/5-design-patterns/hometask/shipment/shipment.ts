import { Shipper } from "../shipper/shipper";
import { Client } from "../client";

export class Shipment {
    private static countId = 0;
    protected static client: Client;
    protected shipper: Shipper;

    constructor() {
        this.getInstance();
        this.shipper = new Shipper();
    }
    getInstance() {
        if (!Shipment.client) {
            Shipment.client = new Client();
            Shipment.client.id = this.getShipmentID();
        }
        return Shipment.client;
    }
    ship() {
        const cost = this.getCost();
        return `Id: ${Shipment.client.id}\nSent from: ${Shipment.client.fromAddress}\nTo: ${Shipment.client.toAddress}\nCost: ${cost}`
    }

    protected getCost(rates?: Record<string, number>) {
        return this.shipper.getCost(Shipment.client.fromZipCode, Shipment.client.weight, rates);
    }

    private getShipmentID() {
        Shipment.countId += 1;
        return Shipment.countId;
    }
}



