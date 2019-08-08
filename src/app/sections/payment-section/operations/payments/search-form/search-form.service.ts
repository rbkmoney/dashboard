import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { filter, map } from 'rxjs/operators';
import isEmpty from 'lodash.isempty';

import { PaymentSearchFormValue } from './payment-search-form-value';
import { toQueryParams } from '../../to-query-params';
import { SearchForm } from '../../search-form';
import { toFormValue } from '../../to-form-value';

@Injectable()
export class SearchFormService extends SearchForm<PaymentSearchFormValue> {
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        super();
        this.searchForm = this.initForm();
        this.defaultValues = this.searchForm.value;
        this.searchForm.valueChanges
            .pipe(map(formValues => toQueryParams<PaymentSearchFormValue>(formValues)))
            .subscribe(queryParams => this.router.navigate([location.pathname], { queryParams }));
        route.queryParams
            .pipe(
                filter(queryParams => !isEmpty(queryParams)),
                map(queryParams => toFormValue(queryParams))
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
            first6: '',
            last4: '',
            bankCardTokenProvider: '',
            bankCardPaymentSystem: '',
            paymentAmount: '',
            rnn: ''
        });
        return form;
    }
}
