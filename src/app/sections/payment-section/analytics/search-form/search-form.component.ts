import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { DaterangeUnitEnum, SelectorItem } from '../../operations/daterange-selector';
import { SearchFormService } from './search-form.service';
import { AnalyticsSearchValue } from '../analytics-search-value';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output() formValueChanges: EventEmitter<AnalyticsSearchValue> = new EventEmitter<AnalyticsSearchValue>();

    valueDebounceTime = 500;

    daterangeItems: SelectorItem[] = [
        {
            value: DaterangeUnitEnum.today,
            checked: false
        },
        {
            value: DaterangeUnitEnum.week,
            checked: true
        },
        {
            value: DaterangeUnitEnum.month,
            checked: false
        },
        {
            value: DaterangeUnitEnum.year,
            checked: false
        }
    ];

    form = this.searchFormService.searchForm;

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        this.searchFormService.formValueChanges$.pipe(debounceTime(this.valueDebounceTime)).subscribe(v => {
            console.log('FORM VALUE CHANGES', v);
            this.formValueChanges.emit(v);
        });
    }

    selectDaterange(v: AnalyticsSearchValue) {
        this.searchFormService.applySearchFormValue(v);
    }
}
