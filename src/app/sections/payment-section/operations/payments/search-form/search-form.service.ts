import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { filter, map } from 'rxjs/operators';
import isEmpty from 'lodash.isempty';

import { PaymentSearchFormValue } from './payment-search-form-value';
import { toQueryParams } from './to-query-params';
import { toFormValue } from './to-form-value';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup;
    private defaultValues: PaymentSearchFormValue;

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.searchForm = this.initForm();
        this.defaultValues = this.searchForm.value;
        this.route.queryParams
            .pipe(
                filter(queryParams => !isEmpty(queryParams)),
                map(queryParams => toFormValue<PaymentSearchFormValue>(queryParams))
            )
            .subscribe(formValue => this.searchForm.patchValue(formValue));
        this.searchForm.valueChanges
            .pipe(map(formValues => toQueryParams<PaymentSearchFormValue>(formValues)))
            .subscribe(queryParams => this.router.navigate([location.pathname], { queryParams }));
    }

    reset() {
        this.searchForm.reset(this.defaultValues);
    }

    private initForm(): FormGroup {
        const form = this.fb.group({
            fromTime: moment()
                .subtract(1, 'month')
                .startOf('day'),
            toTime: moment().endOf('day'),
            limit: [20, Validators.required],
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
            first6: '',
            last4: '',
            bankCardTokenProvider: '',
            bankCardPaymentSystem: '',
            paymentAmount: '',
            continuationToken: ''
        });
        return form;
    }
}
