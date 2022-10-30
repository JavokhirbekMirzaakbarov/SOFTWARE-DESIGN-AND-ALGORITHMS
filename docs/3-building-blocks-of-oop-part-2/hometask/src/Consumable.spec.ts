// @ts-nocheck

import { Consumable } from "./Consumable";

// @ts-expect-error
new Consumable("bread", 1, 1);

class ConsumableWithImplementation extends Consumable {}

describe("Consumable", () => {
  it("should not be spoiled", () => {
    expect(new ConsumableWithImplementation("bread", 1, 1).isSpoiled()).toBeFalsy();
  });

  it("should be spoiled", () => {
    expect(new ConsumableWithImplementation("bread", 1, 1, true).isSpoiled()).toBeTruthy();
  });

  describe("use()", () => {
    it("should return proper string when consumable is not consumed and spoiled", () => {
      expect(new ConsumableWithImplementation("bread", 1, 1).use()).toEqual("You consumed the bread.");
    });

    it("should add information about sickness if consumable is spoiled", () => {
      const bread = new ConsumableWithImplementation("bread", 1, 1, true);

      expect(bread.use()).toEqual("You consumed the bread.\nYou feel sick.");
    });

    it("should return proper result when consumable is consumed", () => {
      const bread = new ConsumableWithImplementation("bread", 1, 1);

      bread.isConsumed = true;

      expect(bread.use()).toEqual("There's nothing left of the bread to consume.");
    });

    it("should return proper result when consumable is consumed and spoiled", () => {
      const bread = new ConsumableWithImplementation("bread", 1, 1, true);

      bread.isConsumed = true;

      expect(bread.use()).toEqual("There's nothing left of the bread to consume.");
    });
  });
});
