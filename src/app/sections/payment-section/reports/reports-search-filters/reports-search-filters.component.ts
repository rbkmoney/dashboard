import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import pick from 'lodash-es/pick';
import { ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, scan } from 'rxjs/operators';

import { Report } from '@dsh/api-codegen/anapi';
import { Daterange } from '@dsh/pipes/daterange';

import { removeEmptyProperties } from '../../operations/operators';
import { daterangeToSearchFilterParams } from './daterange-to-search-filter-params';
import { getDefaultDaterange } from './get-default-daterange';
import { searchFilterParamsToDaterange } from './search-filter-params-to-daterange';
import { SearchFiltersParams } from './search-filters-params';

@UntilDestroy()
@Component({
    selector: 'dsh-reports-search-filters',
    templateUrl: 'reports-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsSearchFiltersComponent implements OnInit {
    @Input() initParams: SearchFiltersParams;
    @Output() searchParamsChanges: EventEmitter<SearchFiltersParams> = new EventEmitter();

    daterange: Daterange;
    form = this.fb.group<{ reportTypes: Report.ReportTypeEnum[] }>({ reportTypes: null });

    private searchParams$: Subject<Partial<SearchFiltersParams>> = new ReplaySubject(1);

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams),
                removeEmptyProperties,
                untilDestroyed(this)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
        this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => this.searchParams$.next(value));
        this.form.patchValue(pick(this.initParams, ['reportTypes']));

        const { fromTime, toTime } = this.initParams;
        this.daterange = !(fromTime || toTime) ? getDefaultDaterange() : searchFilterParamsToDaterange(this.initParams);
        this.daterangeSelectionChange(this.daterange);
    }

    daterangeSelectionChange(v: Daterange | null): void {
        const daterange = v === null ? getDefaultDaterange() : v;
        if (v === null) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeToSearchFilterParams(daterange));
    }
}
