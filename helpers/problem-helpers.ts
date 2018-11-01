import { readText } from "../helpers/fs-helper";
import { Problem } from "../model";

export const getSourceData = async <T>(problem: Problem<T>) => {
    if (problem.setSourceData) {
        const source = await readText(`./problems/${problem.id}.input.txt`);
        // console.log(source);

        problem.setSourceData(source);
    }
};
