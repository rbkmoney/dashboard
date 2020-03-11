import { FormBuilder } from '@angular/forms';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { toSearchParams } from './to-search-params';
import { FormParams } from './form-params';
import { toFormValue } from './to-form-value';
import { toQueryParams } from './to-query-params';
import { PayoutsService } from '../payouts.service';

@Injectable()
export class SearchFormService {
    static defaultParams: FormParams = {
        fromTime: moment()
            .subtract(1, 'month')
            .startOf('day'),
        toTime: moment().endOf('day'),
        shopID: null
    };

    form = this.fb.group(SearchFormService.defaultParams);

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private payoutsService: PayoutsService
    ) {
        this.init();
    }

    search(value = this.form.value) {
        this.payoutsService.search(toSearchParams(value));
    }

    reset() {
        this.form.setValue(SearchFormService.defaultParams);
    }

    private init() {
        this.syncQueryParams();
        this.search();
        this.form.valueChanges.subscribe(v => this.search(v));
    }

    private syncQueryParams() {
        const queryParams = this.route.snapshot.queryParams as Record<keyof FormParams, string>;
        const formValue = toFormValue(queryParams, SearchFormService.defaultParams);
        this.form.setValue(formValue);
        this.setQueryParams(formValue);
        this.form.valueChanges.subscribe(v => this.setQueryParams(v));
    }

    private setQueryParams(formValue: FormParams) {
        const queryParams = toQueryParams(formValue);
        this.router.navigate([location.pathname], { queryParams });
    }
}
