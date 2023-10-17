import { Shape } from "./Shape";

enum E_TRIANGLE {
    EQUILATERAL = "equilateral triangle",
    ISOSCELES = "isosceles triangle",
    SCALENE = "scalene triangle",
}
export class Triangle extends Shape {

    constructor(...args) {
        super(args);
    }

    toString() {
        return `Triangle[v1=${this.points[0].toString()},v2=${this.points[1].toString()},v3=${this.points[2].toString()}]`;
    }

    private checkEquilateralTriangle(sides: number[]): boolean {
        return sides.map(Math.round).reduce((isEquilateral, value, index, array) => {
            const nextValue = array[index + 1] ?? array[0];
            return isEquilateral && value === nextValue;
        }, true);
    }
    getType() {
        const firstSide = this.points[0].distance(this.points[1]);
        const secondSide = this.points[1].distance(this.points[2]);
        const thirdSide = this.points[2].distance(this.points[0]);
        if (this.checkEquilateralTriangle([firstSide, secondSide, thirdSide])) {
            return E_TRIANGLE.EQUILATERAL;
        }
        if (firstSide === secondSide || secondSide ===  thirdSide || firstSide === thirdSide) {
            return E_TRIANGLE.ISOSCELES;
        }
        return E_TRIANGLE.SCALENE;
    }
}