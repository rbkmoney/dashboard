import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { SearchFormValue } from '../search-form-value';
import { DaterangeSelectorService } from './daterange-selector.service';
import { SelectorItem } from './select-item';
import { DateUnit } from './date-unit';
import { DaterangeUnitEnum } from './daterange-unit-enum';

@Component({
    selector: 'dsh-daterange-selector',
    templateUrl: 'daterange-selector.component.html',
    providers: [DaterangeSelectorService]
})
export class DaterangeSelectorComponent implements OnChanges {
    @Input() value: SearchFormValue;
    @Input() items: SelectorItem[];
    @Output() selectDaterange: EventEmitter<SearchFormValue> = new EventEmitter();
    @Output() selectMore: EventEmitter<void> = new EventEmitter(true);

    DaterangeUnitEnum = DaterangeUnitEnum;

    constructor(private daterangeSelectorService: DaterangeSelectorService) {}

    ngOnChanges({ value }: SimpleChanges) {
        if (value) {
            if (!this.items) {
                this.items = this.daterangeSelectorService.changeSelectorItems(this.value);
            }
            if (this.daterangeSelectorService.isMoreChecked(this.items)) {
                this.selectMore.emit();
            }
        }
    }

    selectUnit(unit: DateUnit | DaterangeUnitEnum.more) {
        if (unit === DaterangeUnitEnum.more) {
            this.selectMore.emit();
            return;
        }
        this.selectDaterange.emit(this.daterangeSelectorService.toSearchFormValue(unit));
    }
}
