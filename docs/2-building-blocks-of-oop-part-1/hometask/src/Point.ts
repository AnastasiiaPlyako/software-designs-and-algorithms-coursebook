export class Point {
    x: number;
    y: number;

    constructor();
    constructor(x: number, y: number);
    constructor(...args){
        this.x = args[0] ?? 0;
        this.y = args[1] ?? 0;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    private calculateDistance(pointX, pointY) {
        return Math.sqrt((this.x - pointX) ** 2 + (this.y - pointY) ** 2);
    }

    distance();
    distance(other?: Point);
    distance(x?: number, y?: number);
    distance(...args: Point[] | number[]): number {
        if (!args.length) {
            return this.calculateDistance(0, 0);
        }
        if (args[0] instanceof Point) {
            return this.calculateDistance(args[0].x, args[0].y);
        }
        return this.calculateDistance(args[0], args[1]);
    }
}
