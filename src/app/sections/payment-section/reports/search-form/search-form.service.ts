import { FormBuilder } from '@angular/forms';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { ReportsService } from '../reports.service';
import { toSearchParams } from './to-search-params';
import { FormParams } from './form-params';
import { toFormValue } from './to-form-value';
import { toQueryParams } from './to-query-params';
import { QueryParams } from './query-params';

@Injectable()
export class SearchFormService {
    defaultParams: FormParams = {
        shopID: null,
        reportType: null,
        date: {
            begin: moment()
                .subtract(1, 'month')
                .startOf('day'),
            end: moment().endOf('day')
        }
    };

    form = this.fb.group(this.defaultParams);

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private reportsService: ReportsService
    ) {
        this.init();
    }

    search(value = this.form.value) {
        this.reportsService.search(toSearchParams(value));
    }

    reset() {
        this.form.setValue(this.defaultParams);
    }

    private init() {
        this.syncQueryParams();
        this.search();
        this.form.valueChanges.subscribe(v => this.search(v));
    }

    private syncQueryParams() {
        const queryParams = this.route.snapshot.queryParams as QueryParams;
        const formValue = toFormValue(queryParams, this.defaultParams);
        this.form.setValue(formValue);
        this.setQueryParams(formValue);
        this.form.valueChanges.subscribe(v => this.setQueryParams(v));
    }

    private setQueryParams(formValue: FormParams) {
        const queryParams = toQueryParams(formValue);
        this.router.navigate([location.pathname], { queryParams });
    }
}
