import { Problem } from "../model/problem";
import { generatePrimesAmmount } from "../helpers/primes";

export class LargePrime implements Problem<number> {
    get id() {
        return 7;
    }

    get description() {
        return `By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

        What is the 10 001st prime number?`;
    }

    get input() {
        return {
            demo: [6],
            demoResult: [13],
            real: 10001
        };
    }

    public run(input: number) {
        const primes = generatePrimesAmmount(input);

        return primes[primes.length - 1];
    }
}

export default new LargePrime();
