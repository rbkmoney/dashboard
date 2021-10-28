import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { Currency } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/radio-group-field';
import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-currency-autocomplete-field',
    templateUrl: 'currency-autocomplete-field.component.html',
    providers: [provideValueAccessor(CurrencyAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyAutocompleteFieldComponent extends WrappedFormControlSuperclass<Currency> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options: Option<string>[] = ['RUB', 'USD', 'EUR'].map((currency) => ({ label: currency, value: currency }));

    constructor(injector: Injector) {
        super(injector);
    }
}
