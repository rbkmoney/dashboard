import { MutableKeys } from 'utility-types';

// eslint-disable-next-line @typescript-eslint/ban-types
export type PickMutable<T extends object> = Pick<T, MutableKeys<T>>;
