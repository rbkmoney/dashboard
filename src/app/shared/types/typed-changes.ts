import { SimpleChange } from '@angular/core';

export class TypedSimpleChange<T> extends SimpleChange {
    previousValue: T | null;
    currentValue: T | null;
}

export type TypedChanges<Class, InputProps extends keyof Class> = {
    [Prop in InputProps]?: TypedSimpleChange<Class[Prop]>;
};
