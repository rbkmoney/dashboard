import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Invoice } from '../../../../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-invoice-main-info',
    templateUrl: 'invoice-main-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceMainInfoComponent {
    @Input() invoice: Invoice;
}
