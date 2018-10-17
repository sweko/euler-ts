export interface Config {
    problemsToRun: number[];
    mode: RunType
}

export type RunType = "demo" | "real"
