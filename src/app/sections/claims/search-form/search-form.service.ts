import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, shareReplay, startWith, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import isEmpty from 'lodash.isempty';

import { ClaimSearchFormValue } from './claim-search-form-value';
import { removeEmptyProperties } from '../../payment-section/operations/operators';

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
        this.formValueChanges$.subscribe(formValues =>
            this.router.navigate([location.pathname], { queryParams: formValues })
        );
        this.pathFormByQueryParams();
    }

    private initForm(): FormGroup {
        return this.fb.group({
            claimID: null,
            claimStatus: null
        });
    }

    private pathFormByQueryParams() {
        this.route.queryParams
            .pipe(
                take(1),
                filter(queryParams => !isEmpty(queryParams)),
                removeEmptyProperties
            )
            .subscribe(formValue => this.searchForm.patchValue(formValue || {}));
    }
}
