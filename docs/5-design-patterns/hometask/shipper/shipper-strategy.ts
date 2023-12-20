export class Context {
    strategy: Strategy;

    setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    executeStrategy(weight: number, rate?: number) {
        return this.strategy.execute(weight, rate);
    }
}
interface Strategy {
    execute(weight: number, rate: number): number;
}

export class AirEastStrategy implements Strategy {
    execute(weight: number, rate?: number): number {
        const currentRate = rate || 39;
        return currentRate * weight;
    }
}

export class PacificParcelStrategy implements Strategy {
    execute(weight: number, rate?: number): number {
        const currentRate = rate || 51;
        return currentRate * weight;
    }
}

export class ChicagoSprintStrategy implements Strategy {
    execute(weight: number, rate?: number): number {
        const currentRate = rate || 42;
        return currentRate * weight;
    }
}
