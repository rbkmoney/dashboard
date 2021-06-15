import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import pick from 'lodash-es/pick';
import { combineLatest, defer, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, pluck, scan, shareReplay, take } from 'rxjs/operators';

import { PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { ApiShopsService } from '@dsh/api/shop';
import { Daterange } from '@dsh/pipes/daterange';

import { daterangeFromStr, strToDaterange } from '../../../../shared/utils';
import { filterShopsByRealm, removeEmptyProperties } from '../../operations/operators';
import { SearchParams } from '../search-params';
import { getDefaultDaterange } from './get-default-daterange';
import { shopsToCurrencies } from './shops-to-currencies';

import RealmEnum = PaymentInstitution.RealmEnum;

@UntilDestroy()
@Component({
    selector: 'dsh-analytics-search-filters',
    templateUrl: 'analytics-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsSearchFiltersComponent implements OnInit {
    @Input() initParams: SearchParams;
    @Input() set realm(realm: RealmEnum) {
        this.realm$.next(realm);
    }
    @Output() searchParamsChanges = new EventEmitter<SearchParams>();

    form = this.fb.group<{ shopIDs: string[] }>({ shopIDs: [] });
    searchParams$ = new ReplaySubject<Partial<SearchParams>>(1);
    currencies$: Observable<string[]> = defer(() => this.shops$).pipe(map(shopsToCurrencies), shareReplay(1));
    shopsByCurrency$: Observable<Shop[]> = defer(() =>
        combineLatest([this.searchParams$.pipe(pluck('currency')), this.shops$])
    ).pipe(
        map(([currency, shops]) => shops.filter((shop) => shop.account?.currency === currency)),
        shareReplay(1)
    );
    daterange: Daterange;

    private realm$ = new ReplaySubject<RealmEnum>();
    private shops$: Observable<Shop[]> = this.realm$.pipe(filterShopsByRealm(this.shopService.shops$), shareReplay(1));

    constructor(private shopService: ApiShopsService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.searchParams$
            .pipe(
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                removeEmptyProperties,
                distinctUntilChanged(isEqual),
                untilDestroyed(this)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.searchParams$.next(value));
        this.form.patchValue(pick(this.initParams, ['shopIDs']));

        const { fromTime, toTime, currency } = this.initParams;
        this.daterange = fromTime && toTime ? strToDaterange({ fromTime, toTime }) : getDefaultDaterange();
        this.daterangeSelectionChange(this.daterange);
        if (currency) this.searchParams$.next({ currency });
        else
            this.currencies$
                .pipe(take(1))
                .subscribe((currencies) => this.searchParams$.next({ currency: currencies[0] }));
    }

    daterangeSelectionChange(v: Daterange | null): void {
        const daterange = v === null ? getDefaultDaterange() : v;
        if (v === null) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeFromStr(daterange));
    }

    currencySelectionChange(currency: string): void {
        this.searchParams$.next({ currency });
    }
}
