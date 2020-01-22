export type MapTuple<P extends any[], T extends { [K in string | number | symbol]: number }> = {
    [K in keyof T]: P[T[K]];
};
