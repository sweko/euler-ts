import { Problem } from "../model/problem";

export class SquareDifference implements Problem<number> {
    get id() {
        return 6;
    }

    get description() {
        return `The sum of the squares of the first ten natural numbers is,

        12 + 22 + ... + 102 = 385
        The square of the sum of the first ten natural numbers is,

        (1 + 2 + ... + 10)2 = 552 = 3025
        Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.

        Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.`;
    }

    get input() {
        return {
            demo: [10],
            demoResult: [2640],
            real: 100
        };
    }

    public run(input: number) {
        const numbers = Array.range(1, input);

        const sumSquares = numbers.map(n => n ** 2).sum();
        const squareSum = numbers.sum() ** 2;

        return squareSum - sumSquares;
    }
}

export default new SquareDifference();
