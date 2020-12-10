import { Type } from './type';

export type GetType = (t: typeof Type) => Type;
export type MessageOrGetType = string | GetType;
