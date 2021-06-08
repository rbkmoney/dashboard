import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import isNil from 'lodash-es/isNil';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { coerceBoolean } from '@dsh/utils';

import { Option } from './types';
import { filterOptions } from './utils';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fr-autocomplete-field',
    templateUrl: 'autocomplete-field.component.html',
    styleUrls: ['autocomplete-field.component.scss'],
    providers: [provideValueAccessor(AutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    protected innerToOuter(inner: OptionValue | string | null): OptionValue {
        if (!isNil(inner) && typeof inner !== 'string') {
            return inner;
        }
        return null;
    }
}
