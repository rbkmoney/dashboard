import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { SearchFormService } from './search-form.service';
import { AnalyticsSearchValue } from '../analytics-search-value';
import { SelectorItem } from '../../operations/daterange-selector/select-item';

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output() formValueChanges: EventEmitter<AnalyticsSearchValue> = new EventEmitter<AnalyticsSearchValue>();

    selected = 0;

    valueDebounceTime = 500;

    form = this.searchFormService.searchForm;

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        this.searchFormService.formValueChanges$.pipe(debounceTime(this.valueDebounceTime)).subscribe(v => {
            this.formValueChanges.emit(v);
        });
    }

    selectDaterange(v: AnalyticsSearchValue) {
        this.searchFormService.applySearchFormValue(v);
    }
}
