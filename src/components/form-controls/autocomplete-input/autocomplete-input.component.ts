import { Component, Injector, Input, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { coerceBoolean } from '@dsh/utils';

import { Option } from './types';

@Component({
    selector: 'dsh-autocomplete-input',
    templateUrl: 'autocomplete-input.component.html',
    styleUrls: ['autocomplete-input.component.scss'],
    providers: [provideValueAccessor(AutocompleteInputComponent)],
})
export class AutocompleteInputComponent<OptionValue>
    extends WrappedFormControlSuperclass<OptionValue>
    implements OnInit {
    @Input() label: string;
    @Input() @coerceBoolean required = false;
    @Input() options: Option<OptionValue>[];
    @Input() displayWith: ((value: OptionValue) => string) | null;

    filteredOptions$: Observable<Option<OptionValue>[]>;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.filteredOptions$ = this.formControl.valueChanges.pipe(
            startWith(this.options),
            map((value) => {
                return this.options;
            })
        );
    }

    clearValue(): void {
        this.formControl.setValue(null);
    }

    optionSelected(e: MatAutocompleteSelectedEvent): void {
        console.log('optionSelected', e);
    }
}
