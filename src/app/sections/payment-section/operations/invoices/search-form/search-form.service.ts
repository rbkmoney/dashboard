import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import isEmpty from 'lodash.isempty';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter, pluck, shareReplay, startWith, take } from 'rxjs/operators';

import { RouteEnv } from '../../../../route-env';
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
        this.formValueChanges$.subscribe((formValues) =>
            this.router.navigate([location.pathname], { queryParams: toQueryParams(formValues) })
        );
        this.defaultValues = this.searchForm.value;
        this.init();
    }

    reset() {
        this.searchForm.reset(this.defaultValues);
    }

    private init() {
        this.route.params
            .pipe(
                pluck('envID'),
                take(1),
                filter((e) => e === RouteEnv.test)
            )
            .subscribe(() => this.searchForm.controls.shopIDs.disable());
        this.route.queryParams
            .pipe(
                take(1),
                filter((p) => !isEmpty(p))
            )
            .subscribe((p) => this.searchForm.patchValue(toFormValue<InvoiceSearchFormValue>(p)));
    }

    private initForm(defaultLimit = 20): FormGroup {
        return this.fb.group({
            date: {
                begin: moment().startOf('month'),
                end: moment().endOf('month'),
            },
            limit: [defaultLimit, Validators.required],
            invoiceStatus: '',
            shopIDs: [],
            invoiceID: '',
        });
    }
}
