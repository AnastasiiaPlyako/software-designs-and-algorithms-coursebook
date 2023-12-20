import {Shipment} from "./shipment";

export class Letter extends Shipment {
    getCost() {
        return super.getCost({
            AirEast: 0.39,
            ChicagoSprint: 0.42,
            PacificParcel: 0.51
        });
    }
}

export class Package extends Shipment {
    getCost() {
        return super.getCost({
            AirEast: 0.25,
            ChicagoSprint: 0.20,
            PacificParcel: 0.19
        });
    }
}

export class Oversize extends Shipment {
    getCost() {
        return super.getCost({
            AirEast: 10,
            ChicagoSprint: 0,
            PacificParcel: 0.02
        });
    }
}
