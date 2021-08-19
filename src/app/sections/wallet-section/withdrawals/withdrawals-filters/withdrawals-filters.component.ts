import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import pick from 'lodash-es/pick';

import { DateRange, Preset, createDateRangeWithPreset } from '@dsh/components/filters/date-range-filter';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

export type Filters = { dateRange: DateRange };

@UntilDestroy()
@Component({
    selector: 'dsh-withdrawals-filters',
    templateUrl: 'withdrawals-filters.component.html',
})
export class WithdrawalsFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: Filters;
    @Output() filtersChanged = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Filters>({
        dateRange: this.defaultDateRange,
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.filtersChanged.next(filters));
    }

    ngOnChanges({ initParams }: ComponentChanges<WithdrawalsFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) {
            const keys = ['dateRange', 'invoiceIDs', 'shopIDs', 'binPan'];
            this.form.patchValue(pick(initParams.currentValue, keys));
        }
    }
}
