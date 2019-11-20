import { Omit } from './omit';

export type Replace<T, K> = Omit<T, keyof K> & K;
