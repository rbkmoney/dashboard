export function coerce<I = any, O = any, T = any>(
    fn: (value: I, self: T) => O,
    afterFn?: (newValue: O, self: T, oldValue: I) => void
): PropertyDecorator {
    return function (target: T, key) {
        const _key = Symbol(key.toString());
        target[_key] = target[key];
        Object.defineProperty(target, key, {
            get() {
                return this[_key];
            },
            set: afterFn
                ? function (v) {
                      this[_key] = fn.call(this, v);
                      afterFn.call(this, this[_key], this, v);
                  }
                : function (v) {
                      this[_key] = fn.call(this, v, this);
                  },
        });
    };
}
