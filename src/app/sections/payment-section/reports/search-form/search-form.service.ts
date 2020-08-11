import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { filter, pluck, take } from 'rxjs/operators';

import { RouteEnv } from '../../../route-env';
import { ReportsService } from '../reports.service';
import { FormParams } from './form-params';
import { QueryParams } from './query-params';
import { toFormValue } from './to-form-value';
import { toQueryParams } from './to-query-params';
import { toSearchParams } from './to-search-params';

@Injectable()
export class SearchFormService {
    defaultParams: FormParams = {
        shopIDs: [],
        reportType: null,
        date: {
            begin: moment().startOf('month'),
            end: moment().endOf('month'),
        },
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
        this.route.params
            .pipe(
                pluck('envID'),
                take(1),
                filter((e) => e === RouteEnv.test)
            )
            .subscribe(() => this.form.controls.shopIDs.disable());
        this.syncQueryParams();
        this.search();
        this.form.valueChanges.subscribe((v) => this.search(v));
    }

    private syncQueryParams() {
        const queryParams = this.route.snapshot.queryParams as QueryParams;
        const formValue = toFormValue(queryParams, this.defaultParams);
        this.form.setValue(formValue);
        this.setQueryParams(formValue);
        this.form.valueChanges.subscribe((v) => this.setQueryParams(v));
    }

    private setQueryParams(formValue: FormParams) {
        const queryParams = toQueryParams(formValue);
        this.router.navigate([location.pathname], { queryParams, preserveFragment: true });
    }
}
