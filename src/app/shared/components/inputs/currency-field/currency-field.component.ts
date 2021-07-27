import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { Currency } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/radio-group-field';

@Component({
    selector: 'dsh-currency-field',
    templateUrl: 'currency-field.component.html',
    providers: [provideValueAccessor(CurrencyFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyFieldComponent extends WrappedFormControlSuperclass<Currency> {
    @Input() set currencies(currencies: Currency[]) {
        this.options = currencies?.map((currency) => ({ label: currency, value: currency }));
    }

    options: Option<Currency>[] = [];

    constructor(injector: Injector) {
        super(injector);
    }
}
