import { Comparable } from "./Comparable";

export abstract class Item implements Comparable<Item> {
  static idCounter: number = 0;
  static resetIdCounter() {
    this.idCounter = 0;
  }

  private readonly id: number;
  public readonly name: string;
  value: number;
  weight: number;

  constructor(name: string, value: number, weight: number) {
    this.name = name;
    this.value = value;
    this.weight = weight;
    Item.idCounter++;
    this.id = Item.idCounter;
  }

  abstract use(): void;

  compareTo(other: Item): number {
    if (this.value > other.value) return 1;
    else if (this.value < other.value) return -1;
    else return this.name.localeCompare(other.name);
  }

  toString(): string {
    return `${this.name} − Value: ${this.value.toFixed(2)}, Weight: ${this.weight.toFixed(2)}`;
  }

  getId(): number {
    return this.id;
  }
}
