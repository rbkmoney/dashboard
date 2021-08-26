import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Shop } from '@dsh/api-codegen/anapi/swagger-codegen';
import { RefundStatus } from '@dsh/api-codegen/capi';
import { createDateRangeWithPreset, DateRangeWithPreset, Preset } from '@dsh/components/filters/date-range-filter';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

export interface Filters {
    invoiceIDs: string[];
    shopIDs: Shop['id'][];
    refundStatus: RefundStatus.StatusEnum;
    dateRange: DateRangeWithPreset;
}

@UntilDestroy()
@Component({
    selector: 'dsh-refunds-search-filters',
    templateUrl: 'refunds-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundsSearchFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: Filters;
    @Input() shops: Shop[];
    @Output() searchParamsChanges = new EventEmitter<Filters>();

    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<Filters>({
        invoiceIDs: null,
        shopIDs: null,
        refundStatus: null,
        dateRange: this.defaultDateRange,
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.searchParamsChanges.next(filters));
    }

    ngOnChanges({ initParams }: ComponentChanges<RefundsSearchFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) this.form.patchValue(initParams.currentValue);
    }
}
