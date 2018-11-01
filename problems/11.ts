import { Problem } from "../model/problem";
import { getSourceData } from "../helpers/problem-helpers";

export class LargestGridProduct implements Problem<number> {
    get id() {
        return 11;
    }

    get description() {
        return `In the 20×20 grid below, four numbers along a diagonal line have been marked in red.

        **11.input.txt**

        The product of these numbers is 26 × 63 × 78 × 14 = 1788696.

        What is the greatest product of four adjacent numbers in the same direction (up, down, left, right, or diagonally) in the 20×20 grid?`;
    }

    get input() {
        return {
            demo: [4],
            demoResult: [0],
            real: 4,
        };
    }

    get isAsync() {
        return true;
    }

    private data: number[][] = [];

    public setSourceData(sourceData: string) {
        this.data = sourceData
            .split("\r\n")
            .map(line => line.split(" "))
            .map(line => line.map(item => Number(item)));
    }

    public async run(input: number) {
        // load data
        await getSourceData(this);

        const height = this.data.length;
        const width = this.data[0].length;

        let maxProduct = 0;
        // horizontally
        for (let hindex = 0; hindex < height; hindex++) {
            for (let windex = 0; windex < width - input + 1; windex++) {
                const product = this.data[hindex]
                    .slice(windex, windex + input)
                    .reduce((acc, item) => acc * item, 1);

                if (product > maxProduct) {
                    console.log(`Horizontally: [${hindex},${windex}]`);
                    console.log(this.data[hindex].slice(windex, windex + input));
                    maxProduct = product;
                }
            }
        }

        // vertically
        for (let hindex = 0; hindex < height - input + 1; hindex++) {
            for (let windex = 0; windex < width; windex++) {
                const product = this.data
                    .map(line => line[windex])
                    .slice(hindex, hindex + input)
                    .reduce((acc, item) => acc * item, 1);

                if (product > maxProduct) {
                    console.log(`Vertically: [${hindex},${windex}]`);
                    console.log(this.data
                        .map(line => line[windex])
                        .slice(hindex, hindex + input));
                    maxProduct = product;
                }
            }
        }

        // // top-left
        // for (let hindex = 0; hindex < height - input + 1; hindex++) {
        //     for (let windex = 0; windex < width - input + 1; windex++) {
        //         const product = this.data
        //             .map(line => line[windex])
        //             .slice(hindex, hindex + input)
        //             .reduce((acc, item) => acc * item, 1);

        //         if (product > maxProduct) {
        //             console.log(`Vertically: [${hindex},${windex}]`);
        //             console.log(this.data
        //                 .map(line => line[windex])
        //                 .slice(hindex, hindex + input));
        //             maxProduct = product;
        //         }
        //     }
        // }

        return maxProduct;
    }
}

export default new LargestGridProduct();
