import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  readonly numberOfSlices: number;
  private numberOfEatenSlices: number = 0;

  constructor(value: number, weight: number, numberOfSlices) {
    super("pizza", value, weight, false);
    this.numberOfSlices = numberOfSlices;
  }

  use(): string {
    if (this.numberOfSlices === this.numberOfEatenSlices) {
      return "There's nothing left of the pizza to consume.";
    }
    this.numberOfEatenSlices = this.numberOfEatenSlices + 1;
    return "You consumed a slice of the pizza.";
  }

  getNumberOfEatenSlices(): number {
    return this.numberOfEatenSlices;
  }
}
