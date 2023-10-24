import { Item } from "./Item";

export abstract class Consumable extends Item {
    isConsumed: boolean;
    private _isSpoiled: boolean;
    isSpoiled(): boolean {
        return this._isSpoiled;
    }

    constructor(name: string, value: number, weight: number, isSpoiled?: boolean) {
        super(name, value, weight);
        this.isConsumed = false;
        this._isSpoiled = isSpoiled ?? false;
    }

    use() {
        let resultOfUsing = "";
        if (this.isConsumed) {
            resultOfUsing = `There's nothing left of the ${this.name} to consume.`
        } else {
            resultOfUsing = `You consumed the ${this.name}.`
            if (this._isSpoiled) {
                resultOfUsing += "\nYou feel sick."
            }
        }
        this.isConsumed = true;
        return resultOfUsing;
    }

}
