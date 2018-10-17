import { Problem } from "../model/problem";
import { generatePrimes } from "../helpers/primes";

export class PrimeFactors implements Problem<number> {
    get id() {
        return 3;
    }

    get description() {
        return `The prime factors of 13195 are 5, 7, 13 and 29.

        What is the largest prime factor of the number 600851475143`;
    }

    get input() {
        return {
            demo: [13195],
            demoResult: [29],
            real: 600851475143
        };
    }

    public run(input: number) {
        const limit = Math.sqrt(input) | 0;
        const primes = generatePrimes(limit);
        const factors = primes.filter(prime => input % prime === 0);
        return factors.max();
    }
}

export default new PrimeFactors();
