import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { WrappedFormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';

import { InvoiceStatus } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-invoice-status-filter',
    templateUrl: './invoice-status-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(InvoiceStatusFilterComponent)],
})
export class InvoiceStatusFilterComponent extends WrappedFormControlSuperclass<InvoiceStatus.StatusEnum> {
    statuses = Object.values(InvoiceStatus.StatusEnum);

    constructor(injector: Injector) {
        super(injector);
    }
}
