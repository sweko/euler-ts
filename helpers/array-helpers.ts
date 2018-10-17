export const pairwiseCheck = <T>(array: T[], predicate: (a: T, b: T) => boolean) => {
    for (let findex = 0; findex < array.length - 1; findex++) {
        const first = array[findex];
        for (let sindex = findex + 1; sindex < array.length; sindex++) {
            const second = array[sindex];
            if (!predicate(first, second)) {
                return false;
            }
        }
    }
    return true;
};

export const checkArrayCandidate = <T>(array: T[], candidate: T, predicate: (a: T, b: T) => boolean) => {
    return array.every(item => predicate(item, candidate));
};
