import { Problem } from "../model/problem";

export class SpecialTripler implements Problem<number> {
    get id() {
        return 9;
    }

    get description() {
        return `A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

        a^2 + b^2 = c^2
        For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

        There exists exactly one Pythagorean triplet for which a + b + c = 1000.
        Find the product abc.`;
    }

    get input() {
        return {
            demo: [12],
            demoResult: [60],
            real: 1000
        };
    }

    public run(input: number) {
        for (let aside = 3; aside < 500; aside++) {
            for (let bside = aside + 1; bside < 500; bside++) {
                const sum = aside ** 2 + bside ** 2;
                const root = Math.sqrt(sum) | 0;
                if (root ** 2 === sum) {
                    console.log(aside, bside, root);
                    if (aside + bside + root === input) {
                        return aside * bside * root;
                    }
                }
            }
        }
        return -1;
    }
}

export default new SpecialTripler();
