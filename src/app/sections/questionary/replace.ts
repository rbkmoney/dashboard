export type Replace<T, K> = Pick<T, Exclude<keyof T, keyof K>> & K;
