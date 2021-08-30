import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEmpty from 'lodash-es/isEmpty';
import negate from 'lodash-es/negate';
// eslint-disable-next-line you-dont-need-lodash-underscore/omit
import omit from 'lodash-es/omit';
import pick from 'lodash-es/pick';
import { combineLatest, defer, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Preset, createDateRangeWithPreset } from '@dsh/components/filters/date-range-filter';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

import { AdditionalFilters } from './additional-filters';
import { DialogFiltersComponent } from './additional-filters/components/dialog-filters/dialog-filters.component';
import { MainFilters } from './types/main-filters';
import { WithdrawalsFilters } from './types/withdrawals-filters';

const MAIN_FILTERS_KEYS = ['dateRange'];

@UntilDestroy()
@Component({
    selector: 'dsh-withdrawals-filters',
    templateUrl: 'withdrawals-filters.component.html',
})
export class WithdrawalsFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: WithdrawalsFilters;
    @Output() filtersChanged = new EventEmitter<WithdrawalsFilters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<MainFilters>({
        dateRange: this.defaultDateRange,
    });

    isAdditionalFilterApplied$ = defer(() => this.additionalFilters$).pipe(map(negate(isEmpty)));

    private additionalFilters$ = new ReplaySubject<AdditionalFilters>();

    constructor(private fb: FormBuilder, private dialog: MatDialog) {}

    ngOnInit(): void {
        combineLatest([getFormValueChanges(this.form), this.additionalFilters$])
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.filtersChanged.next(Object.assign({}, ...filters)));
    }

    ngOnChanges({ initParams }: ComponentChanges<WithdrawalsFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) {
            this.form.patchValue(pick(initParams.currentValue, MAIN_FILTERS_KEYS));
            this.additionalFilters$.next(omit(initParams.currentValue, MAIN_FILTERS_KEYS));
        }
    }

    openAdditionalFiltersDialog(): void {
        const data = omit(this.initParams || {}, MAIN_FILTERS_KEYS);
        this.dialog
            .open<DialogFiltersComponent, AdditionalFilters>(DialogFiltersComponent, { data })
            .afterClosed()
            .pipe(take(1))
            .subscribe((filters) => {
                this.additionalFilters$.next(filters);
            });
    }
}
