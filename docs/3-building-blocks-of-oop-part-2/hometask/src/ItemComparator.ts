import { Item } from "./Item";

export interface ItemComparator {
  compare(first: Item, second: Item): number;
}
