export interface Problem<T = any> {
    id: number;
    description: string;
    input: Input<T>

    run: (input: T) => number;
}

export interface Input<T> {
    demo: T[],
    demoResult: number[];
    real: T
}
