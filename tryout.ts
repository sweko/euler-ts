import "./helpers/array-prototype-helpers";
import { generatePrimesDivision, generatePrimeSieve } from "./helpers/primes";
import { performance } from "perf_hooks";

const start = performance.now();
generatePrimeSieve(2000000);
const end = performance.now();
console.log(`Runtime is ${(end - start) | 0}ms`);
