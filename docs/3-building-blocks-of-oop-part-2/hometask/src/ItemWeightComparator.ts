import { Item } from "./Item";
import { ItemComparator } from "./ItemComparator";

export class ItemWeightComparator implements ItemComparator {
  compare(first: Item, second: Item): number {
    if (first.weight > second.weight) return 1;
    else if (first.weight < second.weight) return -1;
    else return first.compareTo(second);
  }
}
