import { AbstractControl } from '@ngneat/reactive-forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { getValue } from './get-value';

export function getFormValueChanges<T>(form: AbstractControl<T>): Observable<T> {
    return form.valueChanges.pipe(
        startWith(form.value),
        map(() => getValue(form))
    );
}
