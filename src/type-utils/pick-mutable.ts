import { MutableKeys } from 'utility-types';

export type PickMutable<T extends object> = Pick<T, MutableKeys<T>>;
