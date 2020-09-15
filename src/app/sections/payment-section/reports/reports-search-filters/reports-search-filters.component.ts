import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import isEqual from 'lodash.isequal';
import { ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, scan } from 'rxjs/operators';

import { Daterange } from '@dsh/pipes/daterange';

import { Report } from '../../../../api-codegen/anapi';
import { daterangeToSearchFilterParams } from './daterange-to-search-filter-params';
import { getDefaultDaterange } from './get-default-daterange';
import { searchFilterParamsToDaterange } from './search-filter-params-to-daterange';
import { SearchFiltersParams } from './search-filters-params';

@Component({
    selector: 'dsh-reports-search-filters',
    templateUrl: 'reports-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsSearchFiltersComponent implements OnChanges, OnInit {
    private searchParams$: Subject<Partial<SearchFiltersParams>> = new ReplaySubject(1);

    @Input() initParams: SearchFiltersParams;
    @Output() searchParamsChanges: EventEmitter<SearchFiltersParams> = new EventEmitter();

    daterange: Daterange;

    ngOnInit() {
        this.searchParams$
            .pipe(
                distinctUntilChanged(isEqual),
                scan((acc, current) => ({ ...acc, ...current }), this.initParams)
            )
            .subscribe((v) => this.searchParamsChanges.emit(v));
    }

    ngOnChanges({ initParams }: SimpleChanges) {
        if (initParams && initParams.firstChange && initParams.currentValue) {
            const v = initParams.currentValue;
            this.daterange = !(v.fromTime || v.toTime) ? getDefaultDaterange() : searchFilterParamsToDaterange(v);
            this.daterangeSelectionChange(this.daterange);
        }
    }

    daterangeSelectionChange(v: Daterange | null) {
        const daterange = v === null ? getDefaultDaterange() : v;
        if (v === null) {
            this.daterange = daterange;
        }
        this.searchParams$.next(daterangeToSearchFilterParams(daterange));
    }

    typesSelectionChange(reportTypes: Report.ReportTypeEnum[]) {
        this.searchParams$.next({ reportTypes });
    }
}
