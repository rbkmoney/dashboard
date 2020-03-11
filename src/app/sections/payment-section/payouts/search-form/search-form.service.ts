import { FormBuilder } from '@angular/forms';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

import { toSearchParams } from './to-search-params';
import { FormParams } from './form-params';
import { toFormValue } from './to-form-value';
import { toQueryParams } from './to-query-params';
import { PayoutsService } from '../payouts.service';

@Injectable()
export class SearchFormService {
    static defaultParams: FormParams = {
        date: {
            begin: moment().startOf('month'),
            end: moment().endOf('month')
        },
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

    search(value) {
        this.payoutsService.search(toSearchParams(value));
    }

    reset() {
        this.form.setValue(SearchFormService.defaultParams);
    }

    private init() {
        this.syncQueryParams();
        this.form.valueChanges.pipe(startWith(this.form.value)).subscribe(v => this.search(v));
    }

    private syncQueryParams() {
        const formValue = toFormValue(this.route.snapshot.queryParams, SearchFormService.defaultParams);
        this.form.setValue(formValue);
        this.form.valueChanges
            .pipe(
                startWith(formValue),
                map(toQueryParams)
            )
            .subscribe(queryParams => {
                this.router.navigate([location.pathname], { queryParams });
            });
    }
}
