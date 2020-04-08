import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, map, shareReplay, startWith, tap } from 'rxjs/operators';

import { ShopService } from '../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { removeEmptyProperties } from '../../operations/operators';
import { AnalyticsService } from '../analytics.service';
import { SearchParams } from '../search-params';
import { FormParams } from './form-params';
import { QueryParams } from './query-params';
import { toFormValue } from './to-form-value';
import { toQueryParams } from './to-query-params';
import { toSearchParams } from './to-search-params';

const DEBOUNCE_TIME = 500;

@Injectable()
export class SearchFormService {
    private defaultParams: FormParams = {
        shopIDs: null,
        date: {
            begin: moment().startOf('month'),
            end: moment().endOf('month'),
            period: 'month'
        }
    };

    private startValue = toFormValue(this.route.snapshot.queryParams as QueryParams, this.defaultParams);

    form = this.fb.group(this.defaultParams);

    shops$ = this.shopService.getShops();

    formValueChanges$: Observable<SearchParams> = this.form.valueChanges.pipe(
        startWith(this.startValue),
        tap(console.log),
        removeEmptyProperties,
        map(toSearchParams),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private analyticsService: AnalyticsService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        this.init();
    }

    private init() {
        this.syncQueryParams();
        this.form.valueChanges.pipe(debounceTime(DEBOUNCE_TIME)).subscribe(v => this.setQueryParams(v));
        this.formValueChanges$.subscribe(params => this.analyticsService.updateSearchParams(params));
    }

    private syncQueryParams() {
        const queryParams = this.route.snapshot.queryParams as QueryParams;
        const formValue = toFormValue(queryParams, this.defaultParams);
        this.form.setValue(formValue);
    }

    private setQueryParams(formValue: FormParams) {
        const queryParams = toQueryParams(formValue);
        this.router.navigate([location.pathname], { queryParams });
    }
}
