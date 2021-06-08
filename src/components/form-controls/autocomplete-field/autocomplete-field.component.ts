import { Component, Injector, Input, OnInit } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { coerceBoolean } from '@dsh/utils';

import { Option } from './types';

const filterPredicate = <T>(searchStr: string) => (option: Option<T>) => option.label.toLowerCase().includes(searchStr);
const filterOptions = <T>(options: Option<T>[]) => (controlValue: unknown): Option<T>[] =>
    typeof controlValue === 'string' ? options.filter(filterPredicate(controlValue.toLowerCase())) : options;

@Component({
    selector: 'dsh-autocomplete-field-2',
    templateUrl: 'autocomplete-field.component.html',
    styleUrls: ['autocomplete-field.component.scss'],
    providers: [provideValueAccessor(AutocompleteFieldComponent)],
})
export class AutocompleteFieldComponent<OptionValue>
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
            map(filterOptions(this.options))
        );
    }

    clearValue(): void {
        this.formControl.setValue(null);
    }
}
