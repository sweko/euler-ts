import { Problem } from "../model/problem";
import { generatePrimes, isPrime } from "../helpers/primes";
import { checkArrayCandidate } from "../helpers/array-helpers";

export class PrimePairSets implements Problem<number> {
    get id() {
        return 60;
    }

    get description() {
        return `The primes 3, 7, 109, and 673, are quite remarkable. By taking any two primes and concatenating them in any order the result will always be prime.
        For example, taking 7 and 109, both 7109 and 1097 are prime. The sum of these four primes, 792, represents the lowest sum for a set of four primes with this property.

        Find the lowest sum for a set of five primes for which any two primes concatenate to produce another prime.`;
    }

    get input() {
        return {
            demo: [4],
            demoResult: [792],
            real: 5
        };
    }

    private isCocoPrime(first: number, second: number) {
        const fs = Number(`${first}${second}`);
        const sf = Number(`${second}${first}`);

        return isPrime(fs) && isPrime(sf);
    }

    private addCandidates(cocoPrimes: number[], allPrimes: number[]): number[][] {

        const candidates = allPrimes
            .filter(prime => checkArrayCandidate(cocoPrimes, prime, this.isCocoPrime))
            .map(prime => [...cocoPrimes, prime]);

        return candidates;
    }

    public run(input: number) {
        const allPrimes = generatePrimes(10000);
        console.log(`Generated ${allPrimes.length} primes`);

        let candidates: number[][] = [[]];
        for (let index = 0; index < input; index++) {
            candidates = candidates
                .map(candidate => this.addCandidates(candidate, allPrimes))
                .reduce((acc, item) => [...acc, ...item], []);
            // console.log(index, candidates.length);
        }

        // console.log(candidates[0]);
        return candidates.map(candidate => candidate.sum()).min();
    }
}

export default new PrimePairSets();
