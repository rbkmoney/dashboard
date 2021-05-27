import { AbstractControl } from '@ngneat/reactive-forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

export function getFormValueChanges<T>(form: AbstractControl<T>): Observable<T> {
    return (form.valueChanges as Observable<T>).pipe(startWith<T, T>(form.value));
}
