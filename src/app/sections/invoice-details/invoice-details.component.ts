import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Invoice } from '@dsh/api-codegen/capi';

import { LAYOUT_GAP } from '../constants';
import { InvoiceDetailsService } from './invoice-details.service';

@Component({
    templateUrl: 'invoice-details.component.html',
    styleUrls: ['invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
    invoice$ = this.invoiceDetailsService.invoice$;
    invoiceError$ = this.invoiceDetailsService.invoiceError$;
    invoiceInitialized$ = this.invoiceDetailsService.invoiceInitialized$;
    unpaid$ = this.invoice$.pipe(map(({ status }) => status === Invoice.StatusEnum.Unpaid));

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private route: ActivatedRoute,
        private invoiceDetailsService: InvoiceDetailsService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(({ invoiceID }) => this.invoiceDetailsService.initialize(invoiceID));
    }
}
