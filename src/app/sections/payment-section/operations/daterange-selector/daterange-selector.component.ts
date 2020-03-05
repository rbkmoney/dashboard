import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { SearchFormValue } from '../search-form-value';
import { DaterangeSelectorService } from './daterange-selector.service';
import { SelectorItem } from './select-item';

@Component({
    selector: 'dsh-daterange-selector',
    templateUrl: 'daterange-selector.component.html',
    providers: [DaterangeSelectorService]
})
export class DaterangeSelectorComponent implements OnChanges {
    @Input() value: SearchFormValue;
    @Output() selectDaterange: EventEmitter<SearchFormValue> = new EventEmitter();
    @Output() selectMore: EventEmitter<void> = new EventEmitter(true);

    items: SelectorItem[];

    constructor(private daterangeSelectorService: DaterangeSelectorService) {}

    ngOnChanges({ value }: SimpleChanges) {
        if (value) {
            this.items = this.daterangeSelectorService.changeSelectorItems(this.value);
            if (this.daterangeSelectorService.isMoreChecked(this.items)) {
                this.selectMore.emit();
            }
        }
    }

    selectUnit(unit: 'today' | 'week' | 'month' | 'more') {
        if (unit === 'more') {
            this.selectMore.emit();
            return;
        }
        this.selectDaterange.emit(this.daterangeSelectorService.toSearchFormValue(unit));
    }
}
