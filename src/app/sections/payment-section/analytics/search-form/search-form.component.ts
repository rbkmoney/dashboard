import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { AnalyticsSearchValue } from '../analytics-search-value';
import { SearchFormService } from './search-form.service';

const DEBOUNCE_TIME = 500;

@Component({
    selector: 'dsh-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output() formValueChanges: EventEmitter<AnalyticsSearchValue> = new EventEmitter<AnalyticsSearchValue>();

    shops$ = this.searchFormService.shops$;

    form = this.searchFormService.searchForm;

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        this.searchFormService.formValueChanges$.pipe(debounceTime(DEBOUNCE_TIME)).subscribe(v => {
            this.formValueChanges.emit(v);
        });
    }

    selectDaterange(v: AnalyticsSearchValue) {
        this.searchFormService.applySearchFormValue(v);
    }
}
