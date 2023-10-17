import {Point} from "./Point";

export abstract class Shape {
  protected color: string;
  protected filled: boolean;
  points: Point[];

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean)
  constructor(...args) {
    if (args[0].length < 3) {
      throw new Error("Shape should have at least 3 points")
    }
    this.points = args[0] ?? [];
    this.color = args[1] ?? "green";
    this.filled = args[2] ?? true;
  }

  toString() {
    const filledValue = this.filled ? 'filled' : 'not filled';
    const pointsValue = this.points.map(point => point.toString()).join(", ");
    return `A Shape with color of ${this.color} and ${filledValue}. Points: ${pointsValue}.`;
  }

  getPerimeter() {
    return this.points.reduce((acc, point, index) => {
      const nextPoint = this.points[index + 1] ?? this.points[0];
      acc += point.distance(nextPoint);
      return acc;
    }, 0);
  }
  abstract getType(): string;
}
