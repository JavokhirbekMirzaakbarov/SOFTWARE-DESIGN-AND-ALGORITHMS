import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class Inventory {
  private items: Item[] = [];

  addItem(item: Item): void {
    this.items.push(item);
  }

  sort(comparator?: ItemComparator): void {
    if (comparator) this.items = this.items.sort(comparator.compare);
    this.items = this.items.sort((first, second) => first.compareTo(second));
  }

  toString(): string {
    return this.items.map((i) => i.toString()).join(", ");
  }
}
