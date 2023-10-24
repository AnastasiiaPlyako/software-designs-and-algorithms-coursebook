import {Comparable} from "./Comparable";

export abstract class Item implements Comparable<Item>{
    private static idCounter: number = 0;
    readonly name: string;
    private readonly id: number;
    value: number;
    weight: number;

    constructor(name, value, weight) {
        this.name = name;
        this.value = value;
        this.weight = weight;
        Item.idCounter += 1;
        this.id = Item.idCounter;
    }
    compareTo(other: Item): number {
        const isEqualName = other.name.toLowerCase() === this.name.toLowerCase()
        if (this.value === other.value && isEqualName) {
            return 0;
        }
        return this.value > other.value ? 1 : -1;
    }

    toString() {
        return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`
    }

    getId() {
        return this.id;
    }
    static resetIdCounter() {
        Item.idCounter = 0;
    }

}
