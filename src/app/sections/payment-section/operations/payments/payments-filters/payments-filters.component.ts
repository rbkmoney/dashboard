import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash-es/isEmpty';
import negate from 'lodash-es/negate';
// eslint-disable-next-line you-dont-need-lodash-underscore/omit
import omit from 'lodash-es/omit';
import pick from 'lodash-es/pick';
import { defer, ReplaySubject, BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { DateRange, Preset, createDateRangeWithPreset } from '@dsh/components/filters/date-range-filter';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

import { filterShopsByRealm } from '../../operators';
import { AdditionalFilters } from './additional-filters';
import { DialogFiltersComponent } from './additional-filters/components/dialog-filters/dialog-filters.component';
import { CardBinPan } from './card-bin-pan-filter';

import RealmEnum = PaymentInstitution.RealmEnum;

type MainFilters = { dateRange: DateRange; invoiceIDs?: string[]; shopIDs?: Shop['id'][]; binPan?: CardBinPan };
export type Filters = MainFilters & AdditionalFilters;

@UntilDestroy()
@Component({
    selector: 'dsh-payments-filters',
    templateUrl: 'payments-filters.component.html',
})
export class PaymentsFiltersComponent implements OnInit, OnChanges {
    @Input() realm: RealmEnum;
    @Input() initParams: Filters;
    @Output() filtersChanged = new EventEmitter<MainFilters>();

    shops$ = defer(() => this.realm$).pipe(filterShopsByRealm(this.shopService.shops$), shareReplay(SHARE_REPLAY_CONF));
    isAdditionalFilterApplied$ = defer(() => this.additionalFilters$).pipe(map(negate(isEmpty)));
    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<MainFilters>({
        invoiceIDs: null,
        shopIDs: null,
        binPan: null,
        dateRange: this.defaultDateRange,
    });

    private additionalFilters$ = new BehaviorSubject<AdditionalFilters>({});
    private realm$ = new ReplaySubject<RealmEnum>(1);

    constructor(private shopService: ApiShopsService, private fb: FormBuilder, private dialog: MatDialog) {}

    ngOnInit(): void {
        combineLatest(getFormValueChanges(this.form), this.additionalFilters$)
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.filtersChanged.next(Object.assign({}, ...filters)));
    }

    ngOnChanges({ realm, initParams }: ComponentChanges<PaymentsFiltersComponent>): void {
        if (realm) this.realm$.next(realm.currentValue);
        if (initParams?.firstChange && initParams.currentValue) {
            const keys = ['dateRange', 'invoiceIDs', 'shopIDs', 'binPan'];
            this.form.patchValue(pick(initParams.currentValue, keys));
            this.additionalFilters$.next(omit(initParams.currentValue, keys));
        }
    }

    openFiltersDialog(): void {
        this.dialog
            .open<DialogFiltersComponent, AdditionalFilters>(DialogFiltersComponent, { data: this.initParams })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.additionalFilters$.next(filters));
    }
}
