import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InvoiceDetailsService } from './invoice-details.service';
import { LAYOUT_GAP } from '../constants';

@Component({
    templateUrl: 'invoice-details.component.html',
    styleUrls: ['invoice-details.component.scss'],
    providers: [InvoiceDetailsService]
})
export class InvoiceDetailsComponent implements OnInit {
    invoice$ = this.invoiceDetailsService.invoice$;
    invoiceError$ = this.invoiceDetailsService.invoiceError$;
    invoiceInitialized$ = this.invoiceDetailsService.invoiceInitialized$;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private route: ActivatedRoute,
        private invoiceDetailsService: InvoiceDetailsService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(({ invoiceID }) => this.invoiceDetailsService.initialize(invoiceID));
    }
}
