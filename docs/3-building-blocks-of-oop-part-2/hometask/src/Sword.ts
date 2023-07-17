import { Weapon } from "./Weapon";

export class Sword extends Weapon {
  private maxDamageModifier: number;

  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("sword", baseDamage, baseDurability, value, weight);
    this.maxDamageModifier = 0.25 * this.baseDamage;
  }

  polish(): void {
    const modifiedDamage = this.damageModifier + Weapon.MODIFIER_CHANGE_RATE;
    if (this.maxDamageModifier <= modifiedDamage) this.damageModifier = this.maxDamageModifier;
    else this.damageModifier = this.damageModifier + Weapon.MODIFIER_CHANGE_RATE;
  }
}
