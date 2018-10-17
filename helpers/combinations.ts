export const getCombinations = <T>(items: T[], selectCount: number): T[][] => {

    if (selectCount === 0) {
        return [[]];
    }

    const result: T[][] = [];

    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const rest = items.slice(index + 1);
        const restCombinations = getCombinations(rest, selectCount - 1).map(comb => {
            return [item, ...comb];
        });
        result.push(...restCombinations);
    }

    return result;
};

export function* getCombinationsGenerator<T>(items: T[], selectCount: number): IterableIterator<T[]> {

    if (selectCount === 0) {
        return yield [];
    }

    const result: T[][] = [];

    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const rest = items.slice(index + 1);
        const combinationsIterator = getCombinationsGenerator(rest, selectCount - 1);
        let comb = combinationsIterator.next();
        while (!comb.done) {
            yield [item, ...comb.value];
            comb = combinationsIterator.next();
        }

    }
}
