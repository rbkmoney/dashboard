import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { coerceBoolean } from '@dsh/utils';

import { Option } from './types';

@Component({
    selector: 'dsh-autocomplete-field',
    templateUrl: 'autocomplete-field.component.html',
})
export class AutocompleteFieldComponent implements OnInit {
    @Input() control: FormControl;

    @Input() title: string;

    @Input() options: Option[];

    filteredOptions$: Observable<Option[]>;

    @Input() @coerceBoolean required = false;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.displayLabel = this.displayLabel.bind(this);
    }

    ngOnInit(): void {
        this.filteredOptions$ = this.control.valueChanges.pipe(
            startWith(this.control.value),
            map((searchValue) => (searchValue ? this.filterOptions(searchValue) : this.options))
        );
    }

    displayLabel(selectedValue: unknown): string {
        const label = this.options?.find((option) => option.value === selectedValue)?.label;
        return label ? label : '';
    }

    clearValue(): void {
        this.control.reset();
    }

    private filterOptions(searchValue: string): Option[] {
        const filterValue = searchValue.toLowerCase();
        return this.options?.filter((option) => option.label.toLowerCase().includes(filterValue));
    }
}