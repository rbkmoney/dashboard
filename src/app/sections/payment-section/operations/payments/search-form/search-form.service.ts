import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, startWith, pluck, shareReplay, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import isEmpty from 'lodash.isempty';
import * as moment from 'moment';

import { PaymentSearchFormValue } from './payment-search-form-value';
import { toQueryParams } from '../../to-query-params';
import { toFormValue } from '../../to-form-value';
import { SearchFormValue } from '../../search-form-value';
import { ShopService } from '../../../../../api';
import { mapToShopInfo, ShopInfo, filterShopsByEnv, removeEmptyProperties } from '../../operators';
import { binValidator, lastDigitsValidator } from '../../../../../form-controls';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup = this.initForm();
    shopsInfo$: Observable<ShopInfo[]> = this.route.params.pipe(
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

    applySearchFormValue(v: SearchFormValue) {
        if (!v || !this.searchForm) {
            return;
        }
        this.searchForm.patchValue(v);
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
        const form = this.fb.group({
            fromTime: moment()
                .subtract(1, 'month')
                .startOf('day'),
            toTime: moment().endOf('day'),
            limit: [defaultLimit, Validators.required],
            shopID: '',
            paymentStatus: '',
            paymentFlow: '',
            paymentMethod: '',
            paymentTerminalProvider: '',
            invoiceID: '',
            paymentID: '',
            payerEmail: '',
            payerIP: '',
            payerFingerprint: '',
            customerID: '',
            first6: ['', binValidator],
            last4: ['', lastDigitsValidator],
            bankCardTokenProvider: '',
            bankCardPaymentSystem: '',
            paymentAmount: '',
            rrn: ''
        });
        return form;
    }
}
