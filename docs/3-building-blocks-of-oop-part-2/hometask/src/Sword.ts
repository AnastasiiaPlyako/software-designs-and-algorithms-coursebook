import {Weapon} from "./Weapon";

export class Sword extends Weapon {
    constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
        super("sword", baseDamage, baseDurability, value, weight);
    }
    polish() {
        const maxDamage = (this.baseDurability * 1.25).toFixed(2);
        const updatedDamage = (this.damageModifier + Weapon.MODIFIER_CHANGE_RATE).toFixed(2);
        console.log(maxDamage, updatedDamage);
        if (updatedDamage <= maxDamage) {
            this.damageModifier += Weapon.MODIFIER_CHANGE_RATE;
        }
    }
}
