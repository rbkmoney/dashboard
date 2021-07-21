import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ComponentChanges } from '@rbkmoney/utils';
import isEqual from 'lodash-es/isEqual';
import { combineLatest, defer, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, pluck, scan, shareReplay, take } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { createDateRangeWithPreset, DateRangeWithPreset, Preset } from '@dsh/components/filters/date-range-filter';
import { getFormValueChanges } from '@dsh/utils';

import { removeEmptyProperties } from '../../operations/operators';
import { RealmShopsService } from '../../services/realm-shops/realm-shops.service';
import { shopsToCurrencies } from './shops-to-currencies';

export interface Filters {
    shopIDs: Shop['id'][];
    dateRange: DateRangeWithPreset;
    currency: string;
}

@UntilDestroy()
@Component({
    selector: 'dsh-analytics-search-filters',
    templateUrl: 'analytics-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsSearchFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: Filters;
    @Output() filterValuesChanged = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Filters>({ shopIDs: null, dateRange: this.defaultDateRange, currency: null });
    filters$ = new ReplaySubject<Partial<Filters>>(1);
    currencies$: Observable<string[]> = defer(() => this.shops$).pipe(map(shopsToCurrencies), shareReplay(1));
    shopsByCurrency$: Observable<Shop[]> = defer(() =>
        combineLatest([this.filters$.pipe(pluck('currency')), this.shops$])
    ).pipe(
        map(([currency, shops]) => shops.filter((shop) => shop.account?.currency === currency)),
        untilDestroyed(this),
        shareReplay(1)
    );

    private shops$ = this.realmShopsService.shops$;

    constructor(private fb: FormBuilder, private realmShopsService: RealmShopsService) {}

    ngOnInit(): void {
        this.filters$
            .pipe(
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                removeEmptyProperties,
                distinctUntilChanged(isEqual),
                untilDestroyed(this)
            )
            .subscribe((v) => this.filterValuesChanged.emit(v));
        getFormValueChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.filters$.next(filters));

        const { currency } = this.initParams;
        if (currency) this.filters$.next({ currency });
        else this.currencies$.pipe(take(1)).subscribe((currencies) => this.filters$.next({ currency: currencies[0] }));
    }

    ngOnChanges({ initParams }: ComponentChanges<AnalyticsSearchFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) {
            this.form.patchValue(initParams.currentValue);
        }
    }

    currencySelectionChange(currency: string): void {
        this.filters$.next({ currency });
        this.form.patchValue({ currency });
    }
}
