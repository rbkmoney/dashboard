import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, filter, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { ClaimSearchFormValue } from './claim-search-form-value';
import { SearchFormValue } from '../../payment-section/operations/search-form-value';
import { removeEmptyProperties } from '../../payment-section/operations/operators';


@Injectable()
export class SearchFormService {
    searchForm: FormGroup;

    private defaultValues: ClaimSearchFormValue;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.searchForm = this.initForm();
        this.defaultValues = this.searchForm.value;
        // this.route.queryParams
        //     .pipe(
        //         filter(queryParams => !isEmpty(queryParams)),
        //         map(queryParams => toFormValue<ClaimSearchFormValue>(queryParams))
        //     )
        //     .subscribe(formValue => this.searchForm.patchValue(formValue));
        // this.searchForm.valueChanges
        //     .pipe(map(formValues => toQueryParams<ClaimSearchFormValue>(formValues)))
        //     .subscribe(queryParams => this.router.navigate([location.pathname], { queryParams }));
    }

    formValueChanges(valueDebounceTime: number): Observable<ClaimSearchFormValue> {
        return this.searchForm.valueChanges.pipe(
            startWith(this.defaultValues),
            filter(() => this.searchForm.status === 'VALID'),
            removeEmptyProperties,
            debounceTime(valueDebounceTime)
        );
    }

    reset() {
        this.searchForm.reset(this.defaultValues);
    }

    applySearchFormValue(v: SearchFormValue) {
        if (!v || !this.searchForm) {
            return;
        }
        this.searchForm.patchValue(v);
    }

    private initForm(): FormGroup {
        return this.fb.group({
            claimID: '',
            claimStatus: '',
            fromTime: moment()
                .subtract(1, 'month')
                .startOf('day'),
            toTime: moment().endOf('day')
        });
    }
}
