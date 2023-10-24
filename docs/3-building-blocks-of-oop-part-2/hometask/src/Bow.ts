import {Weapon} from "./Weapon";

export class Bow extends Weapon {
    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        super('bow', baseDamage, baseDurability, value, weight);
    }

    polish() {
        const updatedDurability = this.durabilityModifier + Bow.MODIFIER_CHANGE_RATE;
        if (updatedDurability <= 1) {
            this.durabilityModifier = updatedDurability;
        }
    }
}
