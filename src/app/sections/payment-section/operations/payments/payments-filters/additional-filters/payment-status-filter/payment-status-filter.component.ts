import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';

import { PaymentStatus } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-payment-status-filter',
    templateUrl: './payment-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(PaymentStatusFilterComponent)],
})
export class PaymentStatusFilterComponent extends WrappedFormControlSuperclass<PaymentStatus.StatusEnum> {
    statuses = Object.values(PaymentStatus.StatusEnum);

    constructor(injector: Injector) {
        super(injector);
    }
}
