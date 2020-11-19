import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';

import { Invoice } from '../../../../../../api-codegen/capi';
import { InvoiceService } from '../../../../../../api/invoice';

@Component({
    selector: 'dsh-invoice-info',
    templateUrl: 'invoice-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceInfoComponent implements OnInit {
    @Input() invoiceID: string;

    invoice$: Observable<Invoice>;

    constructor(private invoiceService: InvoiceService) {}

    ngOnInit() {
        this.invoice$ = this.invoiceService.getInvoiceByID(this.invoiceID).pipe(take(1), shareReplay(1));
    }
}
