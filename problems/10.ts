import { Problem } from "../model/problem";
import { generatePrimes } from "../helpers/primes";

export class SummationOfPrimes implements Problem<number> {
    get id() {
        return 10;
    }

    get description() {
        return `The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

        Find the sum of all the primes below two million.`;
    }

    get input() {
        return {
            demo: [10],
            demoResult: [17],
            real: 2000000
        };
    }

    public run(input: number) {
        return generatePrimes(input)
            .filter(prime => prime < input)
            .sum();
    }
}

export default new SummationOfPrimes();
