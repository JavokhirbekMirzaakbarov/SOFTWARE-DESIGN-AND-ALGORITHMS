export class Point {
  private x: number;
  private y: number;

  // Default constructor
  constructor();

  // Parametrized constructor
  constructor(x: number);
  constructor(x: number, y: number);

  // Common implementation
  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  private calculateDistance(x1: number, x2: number, y1: number, y2: number): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  // Default methos
  public distance(): number;

  // Parametrized methods
  public distance(other: Point): number;
  public distance(x: number, y: number): number;

  // Common implementation
  public distance(arg1?: Point | number, arg2?: number): number {
    if (typeof arg1 === "object") return this.calculateDistance(this.x, arg1.x, this.y, arg1.y);
    else return this.calculateDistance(this.x, (arg1 = 0), this.y, (arg2 = 0));
  }
}
