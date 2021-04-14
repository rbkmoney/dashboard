import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { map, startWith } from 'rxjs/operators';

import { removeEmptyProperties } from '../../../payment-section/operations/operators';
import { WithdrawalsService } from '../withdrawals.service';
import { FormParams } from './form-params';
import { toFormValue } from './to-form-value';
import { toQueryParams } from './to-query-params';
import { toSearchParams } from './to-search-params';

@Injectable()
export class SearchFormService {
    static defaultParams: FormParams = {
        date: {
            begin: moment().startOf('month'),
            end: moment().endOf('month'),
        },
        walletID: null,
        identityID: null,
        withdrawalID: null,
        destinationID: null,
        status: null,
        amountFrom: null,
        amountTo: null,
        currencyID: null,
    };

    form = this.fb.group(SearchFormService.defaultParams);

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private depositsService: WithdrawalsService
    ) {
        this.init();
    }

    search(value) {
        this.depositsService.search(toSearchParams(value));
    }

    reset() {
        this.form.setValue(SearchFormService.defaultParams);
    }

    private init() {
        this.syncQueryParams();
        this.form.valueChanges.pipe(startWith(this.form.value), removeEmptyProperties).subscribe((v) => this.search(v));
    }

    private syncQueryParams() {
        const formValue = toFormValue(this.route.snapshot.queryParams, SearchFormService.defaultParams);
        this.form.setValue(formValue);
        this.form.valueChanges
            .pipe(startWith(formValue), removeEmptyProperties, map(toQueryParams))
            .subscribe((queryParams) => {
                this.router.navigate([location.pathname], { queryParams });
            });
    }
}
