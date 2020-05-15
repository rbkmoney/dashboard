import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { combineLatest, Observable } from 'rxjs';
import { filter, pluck, shareReplay, take } from 'rxjs/operators';

import { RouteEnv } from '../../../../route-env';
import { removeEmptyProperties, ShopInfo } from '../../operators';
import { toQueryParams } from '../../to-query-params';
import { toSearchFormValue } from '../../to-search-form-value';
import { RefundsSearchFormValue } from './refunds-search-form-value';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup = this.initForm();
    private defaultValues: RefundsSearchFormValue;
    formValueChanges$: Observable<RefundsSearchFormValue> = this.searchForm.valueChanges.pipe(
        filter(() => this.searchForm.status === 'VALID'),
        removeEmptyProperties,
        shareReplay(1)
    );

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.formValueChanges$.subscribe(formValues =>
            this.router.navigate([location.pathname], { queryParams: toQueryParams(formValues) })
        );
        this.defaultValues = this.searchForm.value;
    }

    reset() {
        this.searchForm.reset(this.defaultValues);
    }

    init(shopInfos: ShopInfo[]) {
        combineLatest([this.route.params.pipe(pluck('envID')), this.route.queryParams])
            .pipe(take(1))
            .subscribe(([env, queryParams]) => {
                this.searchForm.patchValue(toSearchFormValue<RefundsSearchFormValue>(env, queryParams, shopInfos));
                if (env === RouteEnv.test) {
                    this.searchForm.controls.shopIDs.disable();
                }
            });
    }

    private initForm(defaultLimit = 20): FormGroup {
        return this.fb.group({
            date: {
                begin: moment().startOf('month'),
                end: moment().endOf('month')
            },
            limit: [defaultLimit, Validators.required],
            offset: '',
            invoiceID: '',
            refundID: '',
            refundStatus: '',
            shopIDs: []
        });
    }
}
