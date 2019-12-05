import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, debounceTime, startWith, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import isEmpty from 'lodash.isempty';
import * as moment from 'moment';

import { RefundsSearchFormValue } from './refunds-search-form-value';
import { SearchFormValue } from '../../search-form-value';
import { removeEmptyProperties, ShopInfo, filterShopsByEnv, mapToShopInfo } from '../../operators';
import { toFormValue } from '../../to-form-value';
import { toQueryParams } from '../../to-query-params';
import { ShopService } from '../../../../../api/shop';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup;
    shopsInfo$: Observable<ShopInfo[]> = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo
    );

    private defaultValues: RefundsSearchFormValue;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        this.searchForm = this.initForm();
        this.defaultValues = this.searchForm.value;
        this.route.queryParams
            .pipe(
                filter(queryParams => !isEmpty(queryParams)),
                map(queryParams => toFormValue<RefundsSearchFormValue>(queryParams))
            )
            .subscribe(formValue => this.searchForm.patchValue(formValue));
        this.searchForm.valueChanges
            .pipe(map(formValues => toQueryParams<RefundsSearchFormValue>(formValues)))
            .subscribe(queryParams => this.router.navigate([location.pathname], { queryParams }));
    }

    formValueChanges(valueDebounceTime: number): Observable<RefundsSearchFormValue> {
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

    private initForm(defaultLimit = 20): FormGroup {
        const form = this.fb.group({
            fromTime: moment()
                .subtract(1, 'month')
                .startOf('day'),
            toTime: moment().endOf('day'),
            limit: [defaultLimit, Validators.required],
            offset: '',
            invoiceID: '',
            paymentID: '',
            refundID: '',
            refundStatus: '',
            shopID: ''
        });
        return form;
    }
}
