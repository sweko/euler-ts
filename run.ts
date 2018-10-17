import { config } from "./config";
import { Problem } from "./model";
import { performance } from "perf_hooks";
import minimist from "minimist";

import "./helpers/array-prototype-helpers";

async function run() {
    const { problemsToRun } = config;

    const args = minimist(process.argv.slice(2));

    const realMode = args.mode || config.mode;
    console.log(`Running in ${realMode} mode`);

    console.log("------------------------------------");
    for (const id of problemsToRun) {
        console.log(`Executing problem #${id}`);
        const dynmodule = await import(`./problems/${id}`);
        const solution: Problem = dynmodule.default;

        const inputArray = realMode === "demo" ? solution.input.demo : [solution.input.real]

        for (const input of inputArray) {
            const start = performance.now();
            const result = solution.run(input);
            const end = performance.now();
            console.log(`Runtime is ${(end - start) | 0}ms`);
            if (realMode === "demo") {
                const expectedIndex = inputArray.findIndex(item => item === input);
                const expected = solution.input.demoResult[expectedIndex];
                if (expected === result) {
                    console.log(`Reached expected result of ${expected}`);
                } else {
                    console.log(`Expected result of ${expected}, gotten ${result}`);
                }
            } else {
                console.log(`Result of execution of problem #${id} is ${result}`);
            }
        }
        console.log("------------------------------------");
    }
}

run();