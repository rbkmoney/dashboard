import { Component, Injector } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { BankCardTokenProvider } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-token-provider-filter',
    templateUrl: './token-provider-filter.component.html',
    styleUrls: ['./token-provider-filter.component.scss'],
    providers: [provideValueAccessor(TokenProviderFilterComponent)],
})
export class TokenProviderFilterComponent extends WrappedFormControlSuperclass<BankCardTokenProvider> {
    providers = Object.values(BankCardTokenProvider);

    constructor(injector: Injector) {
        super(injector);
    }
}
