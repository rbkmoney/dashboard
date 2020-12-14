import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Invoice } from '@dsh/api-codegen/anapi';

import { ReceivePaymentsService } from './services/receive-payments/receive-payments.service';

@Component({
    selector: 'dsh-invoice-invoice-details',
    templateUrl: 'invoice-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ReceivePaymentsService],
})
export class InvoiceDetailsComponent implements OnInit {
    @Input() invoice: Invoice;
    @Output() refreshData = new EventEmitter<void>();

    payments$ = this.receivePaymentsService.payments$;

    constructor(private receivePaymentsService: ReceivePaymentsService) {}

    ngOnInit() {
        this.receivePaymentsService.receivePayments(this.invoice.id);
    }
}
