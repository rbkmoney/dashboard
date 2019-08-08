import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

import { SearchFormValue } from './search-form-value';

export class SearchForm<T> {
    searchForm: FormGroup;
    defaultValues: T;

    reset(): T {
        this.searchForm.reset(this.defaultValues);
        return this.defaultValues;
    }

    applySearchFormValue(v: SearchFormValue) {
        if (!v || !this.searchForm) {
            return;
        }
        this.searchForm.patchValue(v);
    }

    formValueChanges(valueDebounceTime: number): Observable<T> {
        return this.searchForm.valueChanges.pipe(
            filter(() => this.searchForm.status === 'VALID'),
            debounceTime(valueDebounceTime)
        );
    }
}
