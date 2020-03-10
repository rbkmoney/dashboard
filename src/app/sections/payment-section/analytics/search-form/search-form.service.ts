import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, shareReplay, startWith, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import negate from 'lodash.negate';
import isEmpty from 'lodash.isempty';
import moment from 'moment';

import { toQueryParams } from '../../operations/to-query-params';
import { toFormValue } from '../../operations/to-form-value';
import { AnalyticsSearchValue } from '../analytics-search-value';
import { removeEmptyProperties } from '../../operations/operators';
import { ShopService } from '../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup = this.initForm();

    shops$ = this.shopService.getShops();

    private defaultValues: AnalyticsSearchValue = this.searchForm.value;
    formValueChanges$: Observable<AnalyticsSearchValue> = this.searchForm.valueChanges.pipe(
        startWith(this.defaultValues),
        removeEmptyProperties,
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        this.formValueChanges$.subscribe(formValues =>
            this.router.navigate([location.pathname], { queryParams: toQueryParams(formValues) })
        );
        this.pathFormByQueryParams();
    }

    reset() {
        this.searchForm.reset(this.defaultValues);
    }

    applySearchFormValue(v: AnalyticsSearchValue) {
        if (!v || !this.searchForm) {
            return;
        }
        this.searchForm.patchValue(v);
    }

    private pathFormByQueryParams() {
        this.route.queryParams
            .pipe(
                take(1),
                filter(negate(isEmpty)),
                map(toFormValue)
            )
            .subscribe(formValue => this.searchForm.patchValue(formValue));
    }

    private initForm(): FormGroup {
        return this.fb.group({
            fromTime: moment()
                .subtract(1, 'week')
                .startOf('day'),
            toTime: moment().endOf('day'),
            shops: undefined
        });
    }
}
