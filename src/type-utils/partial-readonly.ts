import { MutableKeys, ReadonlyKeys } from 'utility-types';

// eslint-disable-next-line @typescript-eslint/ban-types
export type PartialReadonly<T extends object> = Pick<T, MutableKeys<T>> & Partial<Pick<T, ReadonlyKeys<T>>>;
