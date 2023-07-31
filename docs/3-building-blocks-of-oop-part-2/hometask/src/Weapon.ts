import { Item } from "./Item";

export abstract class Weapon extends Item {
  static MODIFIER_CHANGE_RATE = 0.05;
  protected baseDamage: number;
  protected damageModifier: number = 0;
  private baseDurability: number;
  protected durabilityModifier: number = 0;
  private durabilityExhaust: number = 0;
  private isBroken = false;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
  }

  use(): string {
    if (this.isBroken) {
      return `You can't use the ${this.name}, it is broken.`;
    }
    this.durabilityExhaust = Weapon.MODIFIER_CHANGE_RATE;
    const currDurability = this.getEffectiveDurability();
    let response = `You use the ${this.name}, dealing 0.05 points of damage.`;
    if (currDurability <= 0) {
      this.isBroken = true;
      response = response + `\nThe ${this.name} breaks.`;
    }
    return response;
  }

  polish(): void {}

  toString(): string {
    return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(
      2
    )}, Damage: ${this.getEffectiveDamage()?.toFixed(2)}, Durability: ${this.getEffectiveDurability()?.toLocaleString(
      undefined,
      { style: "percent", minimumFractionDigits: 2 }
    )}`;
  }

  getEffectiveDamage(): number {
    return this.baseDamage + this.damageModifier;
  }

  getEffectiveDurability(durabilityModifier?: number): number {
    return this.baseDurability + (durabilityModifier ?? this.durabilityModifier) - this.durabilityExhaust;
  }
}
