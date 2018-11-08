const primeCache: Uint32Array = new Uint32Array(10000000);

primeCache[0] = 2;
// primeCache[1] = 3;
let primeIndex = 0;

const primeDict: { [key: number]: boolean } = {
    2: true,
    //    3: true
};
let maxLimit = 2;

export const generatePrimesDivision = limit => {
    if (limit < maxLimit) {
        return Array.from(primeCache.filter(prime => prime < limit).sort((a, b) => a - b));
    }

    let current = maxLimit;
    while (current % 6 !== 5) {
        current += 1;
    }
    let small = true;
    while (current < limit) {
        if (compareToPrimes(current, primeCache)) {
            primeIndex += 1;
            primeCache[primeIndex] = current;
            primeDict[current] = true;
        }
        current += small ? 2 : 4;
        small = !small;
    }
    maxLimit = limit;
    return Array.from(primeCache.slice(0, primeIndex));
};

// Sieve of Eratosthenes
export const generatePrimeSieve = limit => {

    console.log(`Generating primes up to ${limit}. Up to ${maxLimit} available`);

    if (limit < maxLimit) {
        console.log("slice and dice");
        return Array.from(primeCache.filter(prime => prime < limit).sort((a, b) => a - b));
    }

    const sieve: Uint8Array = new Uint8Array(limit + 1);

    let index = 3;
    while (index <= limit) {
        let factor = 3;
        let product = factor * index;
        while (product <= limit) {
            sieve[product] = 1;
            factor += 2;
            product = factor * index;
        }

        do {
            index += 2;
        }
        while (sieve[index]);
    }

    for (let sindex = 3; sindex <= limit; sindex += 2) {
        if (sieve[sindex] === 0) {
            primeIndex += 1;
            primeCache[primeIndex] = sindex;
            primeDict[sindex] = true;
        }
    }

    maxLimit = limit;
    return Array.from(primeCache.slice(0, primeIndex + 1));
};

export const generatePrimesAmmount = count => {
    const result = [2, 3];
    let current = 5;
    let small = true;
    while (result.length < count) {
        if (compareToPrimes(current, result)) {
            result.push(current);
        }
        current += small ? 2 : 4;
        small = !small;
    }
    return result;
};

const compareToPrimes = (value, primes) => {

    for (let index = 0; index < primeIndex; index++) {
        const prime = primes[index];
        if (value % prime === 0) {
            return false;
        }
    }

    return true;
};

export const isPrime = (input: number) => {
    if (input > maxLimit ** 2) {
        throw Error(`Not enough primes generated for ${input}. MaxLimit is ${maxLimit}.`);
    }
    if (input > maxLimit) {
        return primeCache.every(prime => input % prime !== 0);
    }
    return !!primeDict[input];
};

export const generatePrimes = generatePrimeSieve;
