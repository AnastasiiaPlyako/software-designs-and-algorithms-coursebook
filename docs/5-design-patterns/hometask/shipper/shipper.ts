import { AirEastStrategy, ChicagoSprintStrategy, Context, PacificParcelStrategy } from "./shipper-strategy";

const CodeShipperStrategy = [
    {
        type: 'AirEast',
        codes: [1, 2, 3],
        strategyClass: AirEastStrategy,
    },
    {
        type: 'ChicagoSprint',
        codes: [4, 5, 6],
        strategyClass: PacificParcelStrategy,
    },
    {
        type: 'PacificParcel',
        codes: [7, 8, 9],
        strategyClass: ChicagoSprintStrategy,
    }
]

export class Shipper {
    private static shipper: Shipper;
    getInstance(): Shipper {
        if (!Shipper.shipper) {
            Shipper.shipper = new Shipper();
        }
        return Shipper.shipper;
    }
    getCost(senderZipCode: string, weight: number, rates?: Record<string, number>) {
        const context = new Context();
        let rate;
        const typeStrategy = parseInt(senderZipCode.substr(0));
        if (isNaN(typeStrategy) || typeStrategy < 1) {
            context.setStrategy(new AirEastStrategy());
            rate = rates.AirEast;
        }
        CodeShipperStrategy.forEach((strategy) => {
            if (strategy.codes.includes(typeStrategy)) {
                context.setStrategy(new strategy.strategyClass());
                if (rates) {
                    rate = rates[strategy.type];
                }
            }
        })
        return context.executeStrategy(weight, rate);
    }
}

