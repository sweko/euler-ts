export interface Problem<T = any> {
    id: number;
    description: string;
    input: Input<T>;

    isAsync?: boolean;
    setSourceData?: (data: string) => void;

    run: (input: T) => number | Promise<number>;
}

export interface Input<T> {
    demo: T[];
    demoResult: number[];
    real: T;
}
