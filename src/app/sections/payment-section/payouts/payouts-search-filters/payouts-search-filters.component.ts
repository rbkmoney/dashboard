import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import pick from 'lodash-es/pick';
import { defer, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, scan, shareReplay } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { ApiShopsService } from '@dsh/api/shop';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { Daterange } from '@dsh/pipes/daterange';

import { filterShopsByRealm, removeEmptyProperties } from '../../operations/operators';
import { searchFilterParamsToDaterange } from '../../reports/reports-search-filters/search-filter-params-to-daterange';
import { SearchParams } from '../search-params';
import { daterangeToSearchParams } from './daterange-to-search-params';
import { getDefaultDaterange } from './get-default-daterange';

@UntilDestroy()
@Component({
    selector: 'dsh-payouts-search-filters',
    templateUrl: 'payouts-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutsSearchFiltersComponent implements OnInit {
    @Input() initParams: SearchParams;
    @Input() set realm(realm: string) {
        this.realm$.next(realm);
    }
    @Output() searchParamsChanges = new EventEmitter<SearchParams>();

    form = this.fb.group<{ shopIDs: string[] }>({ shopIDs: [] });
    shops$: Observable<Shop[]> = defer(() => this.realm$).pipe(
        filterShopsByRealm(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );
    daterange: Daterange;

    private searchParams$: Subject<Partial<SearchParams>> = new ReplaySubject(1);
    private realm$ = new ReplaySubject();

    constructor(private shopService: ApiShopsService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                removeEmptyProperties,
                untilDestroyed(this)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.searchParams$.next(value));
        this.form.patchValue(pick(this.initParams, ['shopIDs']));

        const { fromTime, toTime } = this.initParams;
        this.daterange = !(fromTime || toTime) ? getDefaultDaterange() : searchFilterParamsToDaterange(this.initParams);
        this.daterangeSelectionChange(this.daterange);
    }

    daterangeSelectionChange(v: Daterange | null): void {
        const daterange = v === null ? getDefaultDaterange() : v;
        if (v === null) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeToSearchParams(daterange));
    }
}
