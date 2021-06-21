import { ChangeDetectionStrategy, Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { coerceBoolean } from '@dsh/utils';

import { AutocompleteFieldOptions, AUTOCOMPLETE_FIELD_OPTIONS } from './tokens';
import { Option } from './types';
import { filterOptions } from './utils';

@Component({
    selector: 'dsh-autocomplete-field',
    templateUrl: 'autocomplete-field.component.html',
    styleUrls: ['autocomplete-field.component.scss'],
    providers: [provideValueAccessor(AutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteFieldComponent<OptionValue>
    extends WrappedFormControlSuperclass<OptionValue>
    implements OnInit
{
    @Input() label: string;
    @Input() @coerceBoolean required = false;
    @Input() options: Option<OptionValue>[];
    @Input() displayWith: ((value: OptionValue) => string) | null;
    @Input() svgIcon: string | null = this.fieldOptions?.svgIcon;
    @Input() hint: string | null;

    filteredOptions$: Observable<Option<OptionValue>[]>;

    constructor(
        injector: Injector,
        @Optional()
        @Inject(AUTOCOMPLETE_FIELD_OPTIONS)
        private fieldOptions: AutocompleteFieldOptions
    ) {
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
