import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';

import { Invoice } from '../../../../../../api-codegen/capi';
import { InvoiceService } from '../../../../../../api/invoice';

@Component({
    selector: 'dsh-refund-invoice-info',
    templateUrl: 'refund-invoice-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundInvoiceInfoComponent implements OnInit {
    @Input() invoiceID: string;

    invoice$: Observable<Invoice>;

    constructor(private invoiceService: InvoiceService) {}

    ngOnInit() {
        this.invoice$ = this.invoiceService.getInvoiceByID(this.invoiceID).pipe(take(1), shareReplay(1));
    }
}
