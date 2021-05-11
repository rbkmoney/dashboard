/**
 * @deprecated use utility-types/Overwrite
 */
export type Replace<T, K> = Omit<T, keyof K> & K;
