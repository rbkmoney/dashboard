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
import { map } from 'rxjs/operators';

import { createDateRangeWithPreset, Preset } from '@dsh/components/filters/date-range-filter';
import { ComponentChanges } from '@dsh/type-utils';
import { getFormValueChanges } from '@dsh/utils';

import { DialogFiltersComponent } from './additional-filters/components/dialog-filters/dialog-filters.component';
import { AdditionalFilters } from './additional-filters/types/additional-filters';
import { DepositsFilters } from './types/deposits-filters';
import { MainFilters } from './types/main-filters';

@UntilDestroy()
@Component({
    templateUrl: 'deposits-filters.component.html',
    selector: 'dsh-deposits-filters',
})
export class DepositsFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: DepositsFilters;

    @Output() filtersChanged = new EventEmitter<DepositsFilters>();

    isAdditionalFilterApplied$ = defer(() => this.additionalFilters$).pipe(map(negate(isEmpty)));
    defaultDateRange = createDateRangeWithPreset(Preset.Last90days);
    form = this.fb.group<MainFilters>({
        dateRange: this.defaultDateRange,
    });

    private additionalFilters$ = new ReplaySubject<AdditionalFilters>();

    constructor(private fb: FormBuilder, private dialog: MatDialog) {}

    ngOnInit(): void {
        combineLatest([getFormValueChanges(this.form), this.additionalFilters$])
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.filtersChanged.next(Object.assign({}, ...filters)));
    }

    ngOnChanges({ initParams }: ComponentChanges<DepositsFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) {
            const mainFiltersKeys = ['dateRange'];
            this.form.patchValue(pick(initParams.currentValue, mainFiltersKeys));
            this.additionalFilters$.next(omit(initParams.currentValue, mainFiltersKeys));
        }
    }

    openAdditionalFiltersDialog(): void {
        this.dialog
            .open<DialogFiltersComponent, AdditionalFilters>(DialogFiltersComponent, { data: this.initParams })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe((filters) => this.additionalFilters$.next(filters));
    }
}
