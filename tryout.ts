import "./helpers/array-prototype-helpers";
import { getCombinations, getCombinationsGenerator } from "./helpers/combinations";

console.log(getCombinations([3, 7, 109, 673], 2).map(comb => comb.join("")));

const iterable = getCombinationsGenerator([3, 7, 109, 673], 2);

let value = iterable.next();
while (!value.done) {
    console.log(value.value);
    value = iterable.next();
};