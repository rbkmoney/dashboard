import { ValueOf } from './value-of';

type AtLeastOne<Obj, Key extends keyof Obj> = { [key in Exclude<keyof Obj, Key>]?: ValueOf<Obj> } & Pick<Obj, Key>;
type AtLeastOneByKey<T> = { [key in keyof T]: AtLeastOne<T, key> };

export type AtLeastOneOf<T> = ValueOf<AtLeastOneByKey<T>>;
