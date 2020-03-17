import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, shareReplay } from 'rxjs/operators';
import moment from 'moment';

import { toQueryParams } from './to-query-params';
import { toFormValue } from './to-form-value';
import { removeEmptyProperties } from '../../operations/operators';
import { ShopService } from '../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { FormParams } from './form-params';
import { QueryParams } from './query-params';
import { AnalyticsService } from '../../../../api/analytics';
import { SearchParams } from '../search-params';

const DEBOUNCE_TIME = 500;

@Injectable()
export class SearchFormService {
    private defaultParams: FormParams = {
        shopIDs: null,
        date: {
            begin: moment().startOf('month'),
            end: moment().endOf('month')
        }
    };

    form = this.fb.group(this.defaultParams);

    shops$ = this.shopService.getShops();

    private formValueChanges$: Observable<SearchParams> = this.form.valueChanges.pipe(
        removeEmptyProperties,
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        this.init();
        this.form.valueChanges.pipe(debounceTime(DEBOUNCE_TIME)).subscribe(v => {
            console.log('kek', moment.duration(v.date.begin.diff(v.date.end)));
            this.setQueryParams(v)
        });
    }

    private init() {
        this.syncQueryParams();
    }

    private syncQueryParams() {
        const queryParams = this.route.snapshot.queryParams as QueryParams;
        const formValue = toFormValue(queryParams, this.defaultParams);
        this.form.setValue(formValue);
        this.setQueryParams(formValue);
    }

    private setQueryParams(formValue: FormParams) {
        const queryParams = toQueryParams(formValue);
        this.router.navigate([location.pathname], { queryParams });
    }
}
