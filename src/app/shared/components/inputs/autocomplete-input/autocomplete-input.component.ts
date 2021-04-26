import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Option } from './types';

@Component({
    selector: 'dsh-autocomplete-input',
    templateUrl: 'autocomplete-input.component.html',
})
export class AutocompleteInputComponent implements OnInit {
    @Input() control: FormControl;

    @Input() title: string;

    @Input() options: Option[];

    filteredOptions$: Observable<Option[]>;

    constructor() {
        this.displayLabel = this.displayLabel.bind(this);
    }

    ngOnInit() {
        this.filteredOptions$ = this.control.valueChanges.pipe(
            startWith(this.control.value),
            map((searchValue) => (searchValue ? this.filterOptions(searchValue) : this.options))
        );
    }

    displayLabel(selectedValue: any): string {
        const label = this.options?.find((option) => option.value === selectedValue)?.label;
        return label ? label : '';
    }

    clearValue() {
        this.control.reset();
    }

    private filterOptions(searchValue: string): Option[] {
        const filterValue = searchValue.toLowerCase();
        return this.options?.filter((option) => option.label.toLowerCase().includes(filterValue));
    }
}
