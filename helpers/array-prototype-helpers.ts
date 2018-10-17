interface Array<T> {
    sum(selector?: (value: T, index: number, array: T[]) => number): number;
    max(selector?: (value: T, index: number, array: T[]) => number): number;
    min(selector?: (value: T, index: number, array: T[]) => number): number;
    elementEqual(other: T[]): boolean;
}

interface ArrayConstructor {
    range(start: number, end: number): number[];
    rangeTo(end: number): number[];
}

if (!Array.prototype.sum) {
    Array.prototype.sum = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
        if (this == null) {
            throw new TypeError("Array.prototype.sum called on null or undefined");
        }
        const source = (selector ? this.map(selector) : this) as number[];

        return source.reduce((acc, item) => acc + item, 0);
    };
}

if (!Array.prototype.max) {
    Array.prototype.max = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
        if (this == null) {
            throw new TypeError("Array.prototype.max called on null or undefined");
        }
        const source = (selector ? this.map(selector) : this) as number[];

        return source.reduce((acc, item) => item > acc ? item : acc, Number.NEGATIVE_INFINITY);
    };
}

if (!Array.prototype.min) {
    Array.prototype.min = function <T>(selector?: (value: T, index: number, array: T[]) => number): number {
        if (this == null) {
            throw new TypeError("Array.prototype.max called on null or undefined");
        }
        const source = (selector ? this.map(selector) : this) as number[];

        return source.reduce((acc, item) => item < acc ? item : acc, Number.POSITIVE_INFINITY);
    };
}

if (!Array.prototype.elementEqual) {
    Array.prototype.elementEqual = function <T>(other: T[]) {
        if (this == null) {
            throw new TypeError("Array.prototype.elementEqual called on null or undefined");
        }
        if (this.length !== other.length) {
            return false;
        }
        for (let index = 0; index < this.length; index++) {
            if (this[index] !== other[index]) {
                return false;
            }
        }
        return true;
    };
}

if (!Array.range) {
    Array.range = (start: number, end: number) => Array(end + 1 - start).fill(null).map((_, index) => index + start);
}

if (!Array.rangeTo) {
    Array.rangeTo = (end: number) => Array.range(0, end);
}
