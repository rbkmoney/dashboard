import { Component, Injector } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { BankCardPaymentSystem } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-payment-system-filter',
    templateUrl: './payment-system-filter.component.html',
    styleUrls: ['./payment-system-filter.component.scss'],
    providers: [provideValueAccessor(PaymentSystemFilterComponent)],
})
export class PaymentSystemFilterComponent extends WrappedFormControlSuperclass<BankCardPaymentSystem> {
    paymentSystems = Object.values(BankCardPaymentSystem);

    constructor(injector: Injector) {
        super(injector);
    }
}
