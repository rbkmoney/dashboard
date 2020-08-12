import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

import { Daterange } from '@dsh/pipes/daterange';

import { daterangeToSearchFilterParams } from './daterange-to-search-filter-params';
import { searchFilterParamsToDaterange } from './search-filter-params-to-daterange';
import { SearchFiltersParams } from './search-filters-params';

@Component({
    selector: 'dsh-reports-search-filters',
    templateUrl: 'reports-search-filters.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsSearchFiltersComponent implements OnChanges {
    @Input() initParams: SearchFiltersParams;
    @Output() searchParamsChanges: EventEmitter<SearchFiltersParams> = new EventEmitter();

    daterange: Daterange;

    ngOnChanges({ initParams }: SimpleChanges): void {
        if (initParams && initParams.firstChange && initParams.currentValue) {
            this.daterange = searchFilterParamsToDaterange(initParams.currentValue);
            this.daterangeSelectionChange(this.daterange);
        }
    }

    daterangeSelectionChange(v: Daterange) {
        this.searchParamsChanges.emit(daterangeToSearchFilterParams(v));
    }
}
