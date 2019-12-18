import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import isEmpty from 'lodash.isempty';
import mapValues from 'lodash.mapvalues';

import { ClaimSearchFormValue } from './claim-search-form-value';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup;

    private defaultValues: ClaimSearchFormValue;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.searchForm = this.initForm();
        this.route.queryParams
            .pipe(filter(queryParams => !isEmpty(queryParams)))
            .subscribe(formValue => this.searchForm.patchValue(formValue));
        this.searchForm.valueChanges
            .pipe(map(formValues => mapValues(formValues, value => value)))
            .subscribe(queryParams => this.router.navigate([location.pathname], { queryParams }));
        this.defaultValues = this.searchForm.value;
    }

    formValueChanges(valueDebounceTime: number): Observable<ClaimSearchFormValue> {
        return this.searchForm.valueChanges.pipe(
            startWith(this.defaultValues),
            filter(() => this.searchForm.status === 'VALID'),
            debounceTime(valueDebounceTime)
        );
    }

    private initForm(): FormGroup {
        return this.fb.group({
            claimID: null,
            claimStatus: null
        });
    }
}
