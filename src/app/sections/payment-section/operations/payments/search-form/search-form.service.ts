import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import clone from 'lodash.clone';
import isEqual from 'lodash.isequal';
import mapValues from 'lodash.mapvalues';

import { SearchFormParams } from './search-form-params';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup;
    private defaultValues: SearchFormParams;
    private urlDateFormat = 'YYYY-MM-DD';

    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.searchForm = this.initForm();
        this.route.queryParams.subscribe(queryParams => this.updateFormValue(queryParams));
        this.searchForm.valueChanges.subscribe(values => this.updateQueryParams(values));
    }

    reset(): any {
        this.searchForm.reset(this.defaultValues);
        return this.defaultValues;
    }

    filterByDateRange(value: 'today' | 'week' | 'month' | 'more') {
        switch (value) {
            case 'more':
                break;
            case 'today':
                this.searchForm.patchValue({
                    fromTime: moment()
                        .startOf('day')
                        .toDate(),
                    toTime: moment()
                        .endOf('day')
                        .toDate()
                });
                break;
            default:
                this.searchForm.patchValue({
                    fromTime: moment()
                        .startOf('day')
                        .subtract(1, value)
                        .toDate(),
                    toTime: moment()
                        .endOf('day')
                        .toDate()
                });
        }
    }

    private updateQueryParams(value: any) {
        const queryParams = this.formValueToQueryParams(value);
        this.router.navigate(['payment-section', 'operations', 'payments'], { queryParams });
    }

    private updateFormValue(queryParams: any) {
        if (isEqual(queryParams, {})) {
            this.updateQueryParams(this.defaultValues);
        } else {
            this.searchForm.patchValue(this.queryParamsToFormValue(queryParams));
        }
    }

    private formValueToQueryParams(formValue: SearchFormParams): any {
        const mapped = mapValues(formValue, value => (isEqual(value, '') ? null : value));
        return {
            ...mapped,
            fromTime: moment(formValue.fromTime).format(this.urlDateFormat),
            toTime: moment(formValue.toTime).format(this.urlDateFormat)
        };
    }

    private queryParamsToFormValue(params: any): SearchFormParams {
        return {
            ...params,
            fromTime: moment(params.fromTime)
                .startOf('day')
                .toDate(),
            toTime: moment(params.toTime)
                .endOf('day')
                .toDate()
        };
    }

    private initForm(): FormGroup {
        const form = this.fb.group({
            fromTime: moment()
                .subtract(1, 'month')
                .startOf('day')
                .toDate(),
            toTime: moment()
                .endOf('day')
                .toDate(),
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
        this.defaultValues = clone(form.value);
        return form;
    }
}
