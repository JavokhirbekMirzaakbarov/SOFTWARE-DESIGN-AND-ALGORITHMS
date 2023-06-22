import { Point } from "./Point";
export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);

  constructor(points: Point[], color: string = "green", filled: boolean = true) {
    if (points.length < 3) throw new Error("Shape MUST contain AT LEAST 3 points!");
    this.points = points;
    this.color = color;
    this.filled = filled;
  }

  public toString(): string {
    return `A Shape with color of ${this.color} and${this.filled ? "" : " not"} filled. Points: ${this.points
      .map((point) => point.toString())
      .join(", ")}.`;
  }

  public getPerimeter(): number {
    return this.points.reduce(
      (sum, point, index, points) =>
        index === points.length - 1 ? sum + point.distance(points[0]) : sum + point.distance(points[index + 1]),
      0
    );
  }

  abstract getType(): string;
}
