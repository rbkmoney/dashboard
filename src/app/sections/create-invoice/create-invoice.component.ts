import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-create-invoice',
    templateUrl: 'create-invoice.component.html',

    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceComponent {}
