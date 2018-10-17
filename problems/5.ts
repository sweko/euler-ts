import { Problem } from "../model/problem";
import { factorize, getFactorizedLCD, getNumber } from "../helpers/factorization";

export class LowestCommonDenominator implements Problem<number> {
    get id() {
        return 5;
    }

    get description() {
        return `2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

        What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?`;
    }

    get input() {
        return {
            demo: [10],
            demoResult: [2520],
            real: 20
        };
    }

    public run(input: number) {
        const factorizations = Array.range(1, input).map(index => factorize(index));

        const result = factorizations.reduce((acc, factorization) => getFactorizedLCD(acc, factorization), []);

        return getNumber(result);
    }
}

export default new LowestCommonDenominator();
