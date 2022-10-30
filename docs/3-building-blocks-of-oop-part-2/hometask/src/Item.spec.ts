// @ts-nocheck

import { Item } from "./Item";

// @ts-expect-error
new Item("ring", 2, 1);

class ItemWithImplementation extends Item {
  use() {}
}

describe("Item", () => {
  beforeEach(() => {
    Item.resetIdCounter();
  });

  it("should have correct properties", () => {
    const item = new ItemWithImplementation("ring", 2, 1);

    expect(item.name).toEqual("ring");
    expect(item.value).toEqual(2);
    expect(item.weight).toEqual(1);
  });

  it("`resetIdCounter` and `getId` should work as expected", () => {
    const item1 = new ItemWithImplementation("ring", 1, 1);
    const item2 = new ItemWithImplementation("ring2", 1, 1);

    expect(item2.getId()).toEqual(2);

    Item.resetIdCounter();

    expect(item2.getId()).toEqual(2);

    const item3 = new ItemWithImplementation("ring3", 1, 1);

    expect(item3.getId()).toEqual(1);
  });

  describe("compareTo()", () => {
    it("should compare names if items values are equal", () => {
      const item = new ItemWithImplementation("ring", 1, 1);
      const item2 = new ItemWithImplementation("rock", 1, 1);

      expect(item.compareTo(item2)).toEqual(-1);
    });

    it("should return 0 if value and name are the same", () => {
      const item = new ItemWithImplementation("ring", 1, 1);

      expect(item.compareTo(item)).toEqual(0);
    });

    it("should compare return 1 if current item has bigger value", () => {
      const item = new ItemWithImplementation("ring", 2, 1);
      const item2 = new ItemWithImplementation("ring2", 1, 1);

      expect(item.compareTo(item2)).toEqual(1);
    });

    it("should return -1 if current item has smaller value", () => {
      const item = new ItemWithImplementation("ring", 1, 1);
      const item2 = new ItemWithImplementation("ring2", 2, 1);

      expect(item.compareTo(item2)).toEqual(-1);
    });
  });

  it("`toString()` should work as expected", () => {
    expect(new ItemWithImplementation("ring", 1, 1).toString()).toEqual("ring − Value: 1.00, Weight: 1.00");
  });
});
