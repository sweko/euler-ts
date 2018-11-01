interface Uint32Array {
    ensureCapacity(capacity: number): Uint32Array;
}

if (!Uint32Array.prototype.ensureCapacity) {
    Uint32Array.prototype.ensureCapacity = function (capacity: number) {
        if (this.length > capacity) {
            return this;
        }
        const result = new Uint32Array(capacity);
        result.set(this, 0);
        return result;
    };
}
