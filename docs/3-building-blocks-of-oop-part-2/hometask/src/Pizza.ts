import {Consumable} from "./Consumable";

export class Pizza extends Consumable {
    readonly numberOfSlices: number;
    numberOfEatenSlices: number;

    constructor(value: number, weight: number, isSpoiled?: boolean, numberOfSlices?: number) {
        super("pizza", value, weight, isSpoiled);
        this.numberOfSlices = numberOfSlices ?? 0;
        this.numberOfEatenSlices = 0;
    }

    getNumberOfEatenSlices() {
        return this.numberOfEatenSlices;
    }

    use() {
        const numberExistedSlices = this.numberOfSlices - this.numberOfEatenSlices;
        if (!this.numberOfSlices || numberExistedSlices <= 0) {
            this.isConsumed = true;
            return super.use();
        } else {
            this.numberOfEatenSlices += 1;
            return `You consumed a slice of the ${this.name}.`;
        }

    };
}
