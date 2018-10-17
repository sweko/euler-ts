import { Problem } from "../model/problem";

const dieSides = 6;

export class CubeDigitParis implements Problem<number> {
    get id() {
        return 60;
    }

    get description() {
        return `Each of the six faces on a cube has a different digit (0 to 9) written on it; the same is done to a second cube.
        By placing the two cubes side-by-side in different positions we can form a variety of 2-digit numbers.

        In fact, by carefully choosing the digits on both cubes it is possible to display all of the square numbers below one-hundred: 01, 04, 09, 16, 25, 36, 49, 64, and 81.
        For example, one way this can be achieved is by placing {0, 5, 6, 7, 8, 9} on one cube and {1, 2, 3, 4, 8, 9} on the other cube.
        However, for this problem we shall allow the 6 or 9 to be turned upside-down so that an arrangement like {0, 5, 6, 7, 8, 9} and {1, 2, 3, 4, 6, 7}
        allows for all nine square numbers to be displayed; otherwise it would be impossible to obtain 09.
        In determining a distinct arrangement we are interested in the digits on each cube, not the order.

        {1, 2, 3, 4, 5, 6} is equivalent to {3, 6, 4, 1, 2, 5}
        {1, 2, 3, 4, 5, 6} is distinct from {1, 2, 3, 4, 5, 9}

        But because we are allowing 6 and 9 to be reversed, the two distinct sets in the last example both represent the extended set {1, 2, 3, 4, 5, 6, 9}
        for the purpose of forming 2-digit numbers.

        How many distinct arrangements of the two cubes allow for all of the square numbers to be displayed?`;
    }

    get input() {
        return {
            demo: [0],
            demoResult: [1217],
            real: 0
        };
    }

    private squares = [["0", "1"], ["0", "4"], ["0", "9"], ["1", "6"], ["2", "5"], ["3", "6"], ["4", "9"], ["6", "4"], ["8", "1"]];

    private fixupDie(die: string[]) {
        die = die.slice();
        if (die.includes("6")) {
            if (!die.includes("9")) {
                return [...die, "9"];
            }
            return die;
        }
        if (die.includes("9")) {
            if (!die.includes("6")) {
                die.push("6");
                die.sort();
            }
            return die;
        }
        return die;
    }

    private checkSetup(diePair: Pair) {
        const first = this.fixupDie(diePair[0]);
        const second = this.fixupDie(diePair[1]);

        for (const square of this.squares) {
            const fs = first.includes(square[0]) && second.includes(square[1]);
            const sf = second.includes(square[0]) && first.includes(square[1]);
            if (!fs && !sf) {
                return false;
            }
        }
        return true;
    }

    private canAddDigit(die: string[], digit: string) {
        return (die.length !== dieSides) && (!die.includes(digit));
    }

    private addDigit(die: string[], digit: string) {
        const result = die.slice();
        result.push(digit);
        result.sort();
        return result;
    }

    private addPairDigit(pair: Pair, digit: string) {
        const first = pair[0];
        const second = pair[1];

        // everything except 6, 7, 9 is mandatory
        const result = ["2", "3", "4", "5", "8"].includes(digit) ? [] : [pair];

        if (this.canAddDigit(first, digit)) {
            const fd = this.addDigit(first, digit);
            result.push([fd, second]);

            if (this.canAddDigit(second, digit)) {
                result.push([fd, this.addDigit(second, digit)]);
            }
        }
        if (this.canAddDigit(second, digit)) {
            result.push([first, this.addDigit(second, digit)]);
        }

        return result;
    }

    public run(input: number) {
        const initPair: Pair = [["0"], ["1"]];

        let pairs = this.addPairDigit(initPair, "0");

        for (let index = 1; index < 10; index++) {
            pairs = pairs
                .map(pair => this.addPairDigit(pair, index.toString()))
                .reduce((acc, item) => [...acc, ...item], []);
        }

        pairs = pairs
            .filter(pair => pair[0].length === dieSides && pair[1].length === dieSides)
            .filter(pair => this.checkSetup(pair));

        const duplicates = pairs.filter(p1 => pairs.some(p2 => p1[0].elementEqual(p2[1]) && p2[0].elementEqual(p1[1])));

        const total = pairs.length - duplicates.length / 2;

        return total;
    }
}

type Pair = [string[], string[]];

export default new CubeDigitParis();
