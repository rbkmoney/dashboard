import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { defer, Observable, ReplaySubject } from 'rxjs';

import { PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { ApiShopsService } from '@dsh/api/shop';
import { createDateRangeWithPreset, DateRangeWithPreset, Preset } from '@dsh/components/filters/date-range-filter';
import { publishReplayRefCount } from '@dsh/operators';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

import { filterShopsByRealm } from '../../operations/operators';
import { SearchParams } from '../types/search-params';

import RealmEnum = PaymentInstitution.RealmEnum;

export interface Filters {
    shopIDs: Shop['id'][];
    dateRange: DateRangeWithPreset;
}

@UntilDestroy()
@Component({
    selector: 'dsh-payouts-search-filters',
    templateUrl: 'payouts-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutsSearchFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: SearchParams;
    @Input() realm: RealmEnum;
    @Output() searchParamsChanges = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Filters>({ shopIDs: null, dateRange: this.defaultDateRange });
    shops$: Observable<Shop[]> = defer(() => this.realm$).pipe(
        filterShopsByRealm(this.shopService.shops$),
        publishReplayRefCount()
    );

    private realm$ = new ReplaySubject();

    constructor(private shopService: ApiShopsService, private fb: FormBuilder) {}

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.searchParamsChanges.next(filters));
    }

    ngOnChanges({ realm, initParams }: ComponentChanges<PayoutsSearchFiltersComponent>): void {
        if (realm) this.realm$.next(realm.currentValue);
        if (initParams?.firstChange && initParams.currentValue) this.form.patchValue(initParams.currentValue);
    }
}
