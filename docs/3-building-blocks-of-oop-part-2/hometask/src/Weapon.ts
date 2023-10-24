import { Item } from "./Item";

export abstract class Weapon extends Item {
    static MODIFIER_CHANGE_RATE: number = 0.05;
    private baseDamage: number = 0;
    protected set damageModifier(damage: number) {
        this.baseDamage = damage;
    };
    protected get damageModifier() {
       return this.baseDamage;
    };
    protected set durabilityModifier(durability: number) {
        this.baseDurability = durability;
    };

    protected get durabilityModifier() {
        return this.baseDurability;
    };

    baseDurability: number = 0;

    private usedCounter: number = 0;

    constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
        super(name, value, weight);
        this.baseDamage = baseDamage;
        this.baseDurability = baseDurability;
    }

    getEffectiveDamage(damageModifier?: number): number {
        if (damageModifier) {
            this.damageModifier = damageModifier
            return this.baseDamage + this.damageModifier;
        }
        return this.baseDamage;
    }

    getEffectiveDurability()
    getEffectiveDurability(durabilityModifier?: number): number {
        if (durabilityModifier) {
            this.durabilityModifier = durabilityModifier;
            const durability = this.durabilityModifier + this.baseDurability;
            return durability <= 0 ? 0 : durability;
        }
        return this.baseDurability
    }

    toString(): string {
        const itemData = super.toString();
        const damage = this.getEffectiveDamage().toFixed(2);
        const durability = (this.getEffectiveDurability() * 100).toFixed(2);
        return `${itemData}, Damage: ${damage}, Durability: ${durability}%`
    }
    use() {
        if (this.baseDurability < Weapon.MODIFIER_CHANGE_RATE) {
            return `You can't use the ${this.name}, it is broken.`
        }
        this.usedCounter += Weapon.MODIFIER_CHANGE_RATE;
        this.baseDurability -= Weapon.MODIFIER_CHANGE_RATE;
        if (this.baseDurability < Weapon.MODIFIER_CHANGE_RATE) {
            const basedText = `You use the ${this.name}, dealing ${this.usedCounter} points of damage.`
            if (this.baseDurability <= 0) {
                return basedText + `\nThe ${this.name} breaks.`
            }
            return basedText;
        }
        return `You use the ${this.name}, dealing ${this.usedCounter} points of damage.`
    }
}
