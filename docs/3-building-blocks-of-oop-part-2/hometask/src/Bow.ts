import { Weapon } from "./Weapon";

export class Bow extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("bow", baseDamage, baseDurability, value, weight);
  }

  polish(): void {
    let modifier = this.durabilityModifier + Weapon.MODIFIER_CHANGE_RATE;
    const modifiedDurability = this.getEffectiveDurability(modifier);
    if (modifiedDurability >= 1) {
      const baseDurability = modifiedDurability - modifier;
      modifier = 1 - baseDurability;
    }
    this.durabilityModifier = modifier;
  }
}
