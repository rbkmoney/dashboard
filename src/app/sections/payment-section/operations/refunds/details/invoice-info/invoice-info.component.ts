import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { Invoice } from '../../../../../../api-codegen/capi';
import { InvoiceService } from '../../../../../../api/invoice';

@Component({
    selector: 'dsh-invoice-info',
    templateUrl: 'invoice-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceInfoComponent implements OnInit {
    @Input() invoiceID: string;

    invoice$ = new Subject<Invoice>();

    constructor(private invoiceService: InvoiceService) {}

    ngOnInit() {
        this.invoiceService
            .getInvoiceByID(this.invoiceID)
            .pipe(take(1))
            .subscribe((invoice) => this.invoice$.next(invoice));
    }
}
