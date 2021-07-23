import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Shop } from '@dsh/api-codegen/capi';
import { createDateRangeWithPreset, DateRangeWithPreset, Preset } from '@dsh/components/filters/date-range-filter';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

import { SearchParams } from '../types/search-params';

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
    @Input() shops: Shop[];
    @Output() searchParamsChanges = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Filters>({ shopIDs: null, dateRange: this.defaultDateRange });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.searchParamsChanges.next(filters));
    }

    ngOnChanges({ initParams }: ComponentChanges<PayoutsSearchFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) this.form.patchValue(initParams.currentValue);
    }
}
