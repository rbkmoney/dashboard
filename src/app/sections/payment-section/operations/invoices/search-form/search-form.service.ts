import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import isEmpty from 'lodash.isempty';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter, map, pluck, shareReplay, startWith, take } from 'rxjs/operators';

import { routeEnv } from '../../../../route-env';
import { removeEmptyProperties } from '../../operators';
import { toFormValue } from '../../to-form-value';
import { toQueryParams } from '../../to-query-params';
import { InvoiceSearchFormValue } from './invoice-search-form-value';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup = this.initForm();
    private defaultValues: InvoiceSearchFormValue = this.searchForm.value;
    formValueChanges$: Observable<InvoiceSearchFormValue> = this.searchForm.valueChanges.pipe(
        startWith(this.defaultValues),
        filter(() => this.searchForm.status === 'VALID'),
        removeEmptyProperties,
        shareReplay(1)
    );

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.formValueChanges$.subscribe(formValues =>
            this.router.navigate([location.pathname], { queryParams: toQueryParams(formValues) })
        );
        this.pathFormByQueryParams();
        this.checkIfTestEnv();
    }

    reset() {
        this.searchForm.reset(this.defaultValues);
    }

    private pathFormByQueryParams() {
        this.route.queryParams
            .pipe(
                take(1),
                filter(queryParams => !isEmpty(queryParams)),
                map(queryParams => toFormValue<InvoiceSearchFormValue>(queryParams))
            )
            .subscribe(formValue => this.searchForm.patchValue(formValue));
    }

    private initForm(defaultLimit = 20): FormGroup {
        return this.fb.group({
            date: {
                begin: moment().startOf('month'),
                end: moment().endOf('month')
            },
            limit: [defaultLimit, Validators.required],
            invoiceStatus: '',
            shopIDs: [],
            invoiceID: ''
        });
    }

    private checkIfTestEnv() {
        this.route.params
            .pipe(
                take(1),
                pluck('envID'),
                filter(env => env === routeEnv[0])
            )
            .subscribe(() => {
                const { shopIDs } = this.searchForm.controls;
                shopIDs.disable();
                shopIDs.patchValue(['TEST']);
            });
    }
}
