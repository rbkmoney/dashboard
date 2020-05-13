import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import isEmpty from 'lodash.isempty';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter, map, pluck, shareReplay, startWith, take } from 'rxjs/operators';

import { binValidator, lastDigitsValidator } from '@dsh/components/form-controls';

import { ShopService } from '../../../../../api';
import { filterShopsByEnv, mapToShopInfo, removeEmptyProperties, ShopInfo } from '../../operators';
import { toFormValue } from '../../to-form-value';
import { toQueryParams } from '../../to-query-params';
import { PaymentSearchFormValue } from './payment-search-form-value';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup = this.initForm();
    shopsInfos$: Observable<ShopInfo[]> = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo,
        shareReplay(1)
    );
    private defaultValues: PaymentSearchFormValue = this.searchForm.value;
    formValueChanges$: Observable<PaymentSearchFormValue> = this.searchForm.valueChanges.pipe(
        startWith(this.defaultValues),
        filter(() => this.searchForm.status === 'VALID'),
        removeEmptyProperties,
        shareReplay(1)
    );

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        this.formValueChanges$.subscribe(formValues =>
            this.router.navigate([location.pathname], { queryParams: toQueryParams(formValues) })
        );
        this.pathFormByQueryParams();
    }

    reset() {
        this.searchForm.reset(this.defaultValues);
    }

    private pathFormByQueryParams() {
        this.route.queryParams
            .pipe(
                take(1),
                filter(queryParams => !isEmpty(queryParams)),
                map(queryParams => toFormValue<PaymentSearchFormValue>(queryParams))
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
            shopIDs: [],
            paymentStatus: '',
            paymentFlow: '',
            paymentMethod: '',
            paymentTerminalProvider: '',
            invoiceID: '',
            payerEmail: '',
            customerID: '',
            first6: ['', binValidator],
            last4: ['', lastDigitsValidator],
            bankCardTokenProvider: '',
            bankCardPaymentSystem: '',
            paymentAmountFrom: '',
            paymentAmountTo: '',
            rrn: ''
        });
    }
}
