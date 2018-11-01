import { Problem } from "../model/problem";

export class PalindromeProduct implements Problem<number> {
    get id() {
        return 4;
    }

    get description() {
        return `A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

        Find the largest palindrome made from the product of two 3-digit numbers.`;
    }

    get input() {
        return {
            demo: [2],
            demoResult: [9009],
            real: 3
        };
    }

    private checkPalindrome(input: number) {
        return input.toString().split("").reverse().join("") === input.toString();
    }

    public run(input: number) {
        const low = 10 ** (input - 1);
        const high = (10 ** input) - 1;
        const palindromes: number[] = [];

        for (let first = low; first <= high; first += 1) {
            for (let second = first; second <= high; second += 1) {
                const product = first * second;
                if (this.checkPalindrome(product)) {
                    palindromes.push(product);
                }
            }
        }
        return palindromes.max();
    }
}

export default new PalindromeProduct();
