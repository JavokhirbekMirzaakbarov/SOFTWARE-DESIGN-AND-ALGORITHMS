// @ts-nocheck

import { Bow } from "./Bow";

describe("Bow", () => {
  let bow;

  beforeEach(() => {
    bow = new Bow(100, 0.9, 1, 1);
  });

  it("should have proper name", () => {
    expect(bow.name).toEqual("bow");
  });

  describe("polish()", () => {
    it("should work correctly", () => {
      bow.polish();
      expect(bow.toString()).toEqual("bow − Value: 1.00, Weight: 1.00, Damage: 100.00, Durability: 95.00%");

      bow.polish();
      expect(bow.toString()).toEqual("bow − Value: 1.00, Weight: 1.00, Damage: 100.00, Durability: 100.00%");

      bow.polish();
      expect(bow.toString()).toEqual("bow − Value: 1.00, Weight: 1.00, Damage: 100.00, Durability: 100.00%");
    });
  });
});
