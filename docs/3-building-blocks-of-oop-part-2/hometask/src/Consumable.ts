import { Item } from "./Item";

export abstract class Consumable extends Item {
  isConsumed: boolean = false;
  private _isSpoiled: boolean;

  constructor(name: string, value: number, weight: number, isSpoiled = false) {
    super(name, value, weight);
    this._isSpoiled = isSpoiled;
  }

  isSpoiled(): boolean {
    return this._isSpoiled;
  }

  use(): string {
    if (this.isConsumed) {
      return `There's nothing left of the ${this.name} to consume.`;
    }
    let response = `You consumed the ${this.name}.`;
    if (this.isSpoiled()) {
      response = response + "\nYou feel sick.";
    }
    return response;
  }
}
