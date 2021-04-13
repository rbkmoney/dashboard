import { SimpleChange } from '@angular/core';
import { Overwrite } from 'utility-types';

export type TypedSimpleChange<T> = Overwrite<
    SimpleChange,
    {
        previousValue: T;
        currentValue: T;
    }
>;

export type ComponentChange<T, P extends keyof T> = TypedSimpleChange<T[P]>;

export type ComponentChanges<T> = {
    [P in keyof T]?: ComponentChange<T, P>;
};
