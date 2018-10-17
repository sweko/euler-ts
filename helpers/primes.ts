const primeCache: Uint8Array = new Uint8Array([2, 3]);
const primeDict: { [key: number]: boolean } = {
    2: true,
    3: true
};
let maxLimit = 3;

export const generatePrimes = limit => {
    if (limit < maxLimit) {
        return primeCache.filter(prime => prime < limit).sort((a, b) => a - b);
    }

    let current = maxLimit;
    while (current % 6 !== 5) {
        current += 1;
    }
    let small = true;
    while (current < limit) {
        if (compareToPrimes(current, primeCache)) {
            primeCache.push(current);
            primeDict[current] = true;
        }
        current += small ? 2 : 4;
        small = !small;
    }
    maxLimit = limit;
    return primeCache.slice();

    // let current = maxLimit;
    // while (current % 6 !== 5) {
    //     current += 1;
    // }
    // let small = true;
    // while (current < limit) {
    //     if (compareToPrimes(current, primeCache)) {
    //         primeCache.push(current);
    //         primeDict[current] = true;
    //     }
    //     current += small ? 2 : 4;
    //     small = !small;
    // }
    // maxLimit = limit;
    // return primeCache.slice();
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

    for (const prime of primes) {
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
