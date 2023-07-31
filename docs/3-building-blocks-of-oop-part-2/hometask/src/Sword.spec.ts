import { Sword } from "./Sword";

describe("Sword", () => {
  let sword;

  beforeEach(() => {
    sword = new Sword(1, 1, 1, 1);
  });

  it("should have proper name", () => {
    expect(sword.name).toEqual("sword");
  });

  describe("polish()", () => {
    it("should work correctly", () => {
      sword.polish();
      sword.polish();
      sword.polish();
      sword.polish();

      expect(sword.toString()).toEqual("sword − Value: 1.00, Weight: 1.00, Damage: 1.20, Durability: 100.00%");
      sword.polish();

      expect(sword.toString()).toEqual("sword − Value: 1.00, Weight: 1.00, Damage: 1.25, Durability: 100.00%");

      sword.polish();
      expect(sword.toString()).toEqual("sword − Value: 1.00, Weight: 1.00, Damage: 1.25, Durability: 100.00%");
    });
  });
});
