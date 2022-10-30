// @ts-nocheck

import { Pizza } from "./Pizza";

describe("Pizza", () => {
  describe("use()", () => {
    it("should return proper string when consumed", () => {
      const pizza = new Pizza(1, 1, 0);

      expect(pizza.numberOfSlices).toEqual(0);
      expect(pizza.getNumberOfEatenSlices()).toEqual(0);
      expect(pizza.use()).toEqual("There's nothing left of the pizza to consume.");
      expect(pizza.numberOfSlices).toEqual(0);
      expect(pizza.getNumberOfEatenSlices()).toEqual(0);
    });

    it("should return proper string if is not consumed", () => {
      const pizza = new Pizza(1, 1, 1);

      expect(pizza.numberOfSlices).toEqual(1);
      expect(pizza.getNumberOfEatenSlices()).toEqual(0);
      expect(pizza.use()).toEqual("You consumed a slice of the pizza.");
      expect(pizza.numberOfSlices).toEqual(1);
      expect(pizza.getNumberOfEatenSlices()).toEqual(1);

      expect(pizza.use()).toEqual("There's nothing left of the pizza to consume.");
    });
  });
});
