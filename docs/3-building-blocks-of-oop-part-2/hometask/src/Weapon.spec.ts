// @ts-nocheck

import { Weapon } from "./Weapon";

// @ts-expect-error
new Weapon("bow", 1, 0.5, 2, 1);

class WeaponWithImplementation extends Weapon {
  polish() {}
}

describe("Weapon", () => {
  let weapon;

  beforeEach(() => {
    weapon = new WeaponWithImplementation("bow", 1, 0.5, 2, 1);
  });

  it("should have proper fields", () => {
    expect(weapon.name).toEqual("bow");
    expect(weapon.value).toEqual(2);
    expect(weapon.weight).toEqual(1);
  });

  it("should return effective damage", () => {
    expect(weapon.getEffectiveDamage()).toEqual(1);
  });

  it("should return effective durability", () => {
    expect(weapon.getEffectiveDurability()).toEqual(0.5);
    expect(weapon.getEffectiveDurability(0.5)).toEqual(1);
  });

  it("should have proper description for just created weapon", () => {
    expect(weapon.toString()).toEqual("bow − Value: 2.00, Weight: 1.00, Damage: 1.00, Durability: 50.00%");
  });

  describe("use()", () => {
    it("should return proper string for weapon that does not break", () => {
      expect(weapon.use()).toEqual("You use the bow, dealing 0.05 points of damage.");
      expect(weapon.toString()).toEqual("bow − Value: 2.00, Weight: 1.00, Damage: 1.00, Durability: 45.00%");
    });

    it("should return proper string for weapon that breaks", () => {
      weapon = new WeaponWithImplementation("bow", 1, 0.05, 2, 1);

      expect(weapon.use()).toEqual("You use the bow, dealing 0.05 points of damage.\nThe bow breaks.");
      expect(weapon.toString()).toEqual("bow − Value: 2.00, Weight: 1.00, Damage: 1.00, Durability: 0.00%");
    });

    it("should return proper string for weapon that is already broken", () => {
      weapon = new WeaponWithImplementation("bow", 1, 0.05, 2, 1);

      weapon.use();

      const getEffectiveDurabilitySpy = spyOn(weapon, "getEffectiveDurability").and.callThrough();

      expect(weapon.use()).toEqual("You can't use the bow, it is broken.");
      expect(getEffectiveDurabilitySpy).not.toHaveBeenCalled();
      expect(weapon.toString()).toEqual("bow − Value: 2.00, Weight: 1.00, Damage: 1.00, Durability: 0.00%");
    });
  });
});
