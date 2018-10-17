import { Problem } from "../model/problem";

export class ProblemOne implements Problem<number> {
    public get id() {
        return 1;
    }

    public get description() {
        return `If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. 
        The sum of these multiples is 23.
        Find the sum of all the multiples of 3 or 5 below 1000.`;
    }

    public get input() {
        return {
            demo: [10],
            demoResult: [23],
            real: 1000
        };
    }

    public run(input: number) {
        let result = 0;
        for (let i = 1; i < input; i += 1) {
            if ((i % 3 === 0) || (i % 5 === 0)) {
                result += i;
            }
        }
        return result;
    }
}

export default new ProblemOne();
