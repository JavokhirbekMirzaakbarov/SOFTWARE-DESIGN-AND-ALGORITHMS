import { Comparable } from './Comparable';

let id = 0;

export abstract class Item implements Comparable<Item> {
    public compareTo(other: Item): number {
        // your code goes here
    }

    // your code goes here
}
