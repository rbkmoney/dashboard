import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash-es/isEmpty';
import negate from 'lodash-es/negate';
// eslint-disable-next-line you-dont-need-lodash-underscore/omit
import omit from 'lodash-es/omit';
import pick from 'lodash-es/pick';
import { combineLatest, defer, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/anapi/swagger-codegen';
import { createDateRangeWithPreset, Preset, DateRangeWithPreset } from '@dsh/components/filters/date-range-filter';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

import { AdditionalFilters, DialogFiltersComponent } from './additional-filters';

type MainFilters = {
    dateRange: DateRangeWithPreset;
};
export type Filters = MainFilters & AdditionalFilters;

const MAIN_FILTERS = ['dateRange'];
const ADDITIONAL_FILTERS = ['invoiceIDs', 'shopIDs', 'refundStatus'];

@UntilDestroy()
@Component({
    selector: 'dsh-refunds-search-filters',
    templateUrl: 'refunds-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundsSearchFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: Filters;
    @Input() shops: Shop[];
    @Output() filtersChanged = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Filters>({
        dateRange: this.defaultDateRange,
        shopIDs: null,
        invoiceIDs: null,
        refundStatus: null,
    });

    isAdditionalFilterApplied$ = defer(() => this.additionalFilters$).pipe(map(negate(isEmpty)));

    get keys(): string[] {
        return this.mediaObserver.isActive('gt-sm') ? [...MAIN_FILTERS, ...ADDITIONAL_FILTERS] : MAIN_FILTERS;
    }

    private additionalFilters$ = new BehaviorSubject<AdditionalFilters>({});

    constructor(private fb: FormBuilder, private dialog: MatDialog, private mediaObserver: MediaObserver) {}

    ngOnInit(): void {
        combineLatest([
            getFormValueChanges(this.form).pipe(map((filters) => pick(filters, this.keys) as MainFilters)),
            this.additionalFilters$.pipe(map((filters) => omit(filters, this.keys))),
        ])
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.filtersChanged.next(Object.assign({}, ...filters)));
    }

    ngOnChanges({ initParams }: ComponentChanges<RefundsSearchFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) {
            this.form.patchValue(pick(initParams.currentValue, this.keys));
            this.additionalFilters$.next(omit(initParams.currentValue, this.keys));
        }
    }

    openFiltersDialog(): void {
        this.dialog
            .open<DialogFiltersComponent, AdditionalFilters>(DialogFiltersComponent, {
                data: omit(this.initParams, this.keys),
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.additionalFilters$.next(filters));
    }
}
