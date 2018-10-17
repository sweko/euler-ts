import { generatePrimes } from "./primes";

export interface Factor {
    prime: number;
    cardinality: number;
}

export type Factorization = Factor[];

export const factorize = (input: number) => {
    const primes = generatePrimes(input);
    const factors = primes.filter(prime => input % prime === 0);

    const result: Factorization = [];
    for (const prime of factors) {
        let cardinality = 1;
        let value = input / prime;
        while (value % prime === 0) {
            value /= prime;
            cardinality += 1;
        }
        result.push({ prime, cardinality });
    }
    if (result.length === 0) {
        result.push({
            prime: input,
            cardinality: 1
        });
    }
    return result;
};

export const sortPrimes = (factorization: Factorization) => factorization.slice().sort((a, b) => a.prime - b.prime);

export const getFactorizedLCD = (first: Factorization, second: Factorization) => {
    const result = first.slice();

    for (const factor of second) {
        const resFactor = result.find(f => f.prime === factor.prime);
        if (resFactor) {
            resFactor.cardinality = Math.max(resFactor.cardinality, factor.cardinality);
        } else {
            result.push(factor);
        }
    }

    return sortPrimes(result);
};

export const getNumber = (factors: Factorization) =>
    factors.reduce((acc, factor) => acc * factor.prime ** factor.cardinality, 1);
