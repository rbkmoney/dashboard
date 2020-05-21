import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import isEmpty from 'lodash.isempty';
import { Observable } from 'rxjs';
import { filter, shareReplay, startWith, take } from 'rxjs/operators';

import { removeEmptyProperties } from '../../payment-section/operations/operators';
import { ClaimSearchFormValue } from './claim-search-form-value';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup = this.initForm();

    private defaultValues: ClaimSearchFormValue = this.searchForm.value;

    formValueChanges$: Observable<ClaimSearchFormValue> = this.searchForm.valueChanges.pipe(
        startWith(this.defaultValues),
        filter(() => this.searchForm.status === 'VALID'),
        shareReplay(1)
    );

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.formValueChanges$.subscribe((formValues) => {
            const { claimStatus } = formValues;
            if (claimStatus && !claimStatus.length) {
                formValues.claimStatus = null;
            }
            this.router.navigate([location.pathname], { queryParams: formValues });
        });
        this.pathFormByQueryParams();
    }

    private initForm(): FormGroup {
        return this.fb.group({
            claimID: null,
            claimStatus: null,
        });
    }

    private pathFormByQueryParams() {
        this.route.queryParams
            .pipe(
                take(1),
                filter((queryParams) => !isEmpty(queryParams)),
                removeEmptyProperties
            )
            .subscribe((formValue) => {
                const value: any = {};
                Object.assign(value, formValue);
                if (value.claimStatus && !Array.isArray(value.claimStatus)) {
                    value.claimStatus = [value.claimStatus];
                }
                this.searchForm.patchValue(value);
            });
    }
}
