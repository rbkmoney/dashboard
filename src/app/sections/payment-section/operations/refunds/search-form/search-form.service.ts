import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import isEmpty from 'lodash.isempty';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter, map, pluck, shareReplay, startWith, take } from 'rxjs/operators';

import { ShopService } from '../../../../../api/shop';
import { SearchFormValue } from '../../../search-form-value';
import { filterShopsByEnv, mapToShopInfo, removeEmptyProperties, ShopInfo } from '../../operators';
import { toFormValue } from '../../to-form-value';
import { toQueryParams } from '../../to-query-params';
import { RefundsSearchFormValue } from './refunds-search-form-value';

@Injectable()
export class SearchFormService {
    searchForm: FormGroup = this.initForm();
    shopsInfos$: Observable<ShopInfo[]> = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        mapToShopInfo,
        shareReplay(1)
    );
    private defaultValues: RefundsSearchFormValue = this.searchForm.value;
    formValueChanges$: Observable<RefundsSearchFormValue> = this.searchForm.valueChanges.pipe(
        startWith(this.defaultValues),
        filter(() => this.searchForm.status === 'VALID'),
        removeEmptyProperties,
        shareReplay(1)
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

    applySearchFormValue(v: SearchFormValue) {
        if (!v || !this.searchForm) {
            return;
        }
        this.searchForm.patchValue(v);
    }

    private pathFormByQueryParams() {
        this.route.queryParams
            .pipe(
                take(1),
                filter(queryParams => !isEmpty(queryParams)),
                map(queryParams => toFormValue<RefundsSearchFormValue>(queryParams))
            )
            .subscribe(formValue => this.searchForm.patchValue(formValue));
    }

    private initForm(defaultLimit = 20): FormGroup {
        const form = this.fb.group({
            date: {
                begin: moment().startOf('month'),
                end: moment().endOf('month')
            },
            limit: [defaultLimit, Validators.required],
            offset: '',
            invoiceID: '',
            refundID: '',
            refundStatus: '',
            shopIDs: []
        });
        return form;
    }
}
