import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Invoice, InvoiceStatus } from '../../../api-codegen/capi/swagger-codegen';
import { StatusColor as Color } from '../../../theme-manager';
import { LAYOUT_GAP } from '../../constants';
import { StatusViewInfo } from '../status-details-item/status-details-item.component';
import { InvoiceDetailsService } from './invoice-details.service';

@Component({
    selector: 'dsh-invoice-details',
    templateUrl: './invoice-details.component.html',
    styleUrls: ['./invoice-details.component.scss'],
    providers: [InvoiceDetailsService],
})
export class InvoiceDetailsComponent implements OnInit {
    @Input() invoiceID: string;

    invoice$ = this.invoiceDetailsService.invoice$;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private invoiceDetailsService: InvoiceDetailsService,
        private router: Router
    ) {}

    ngOnInit() {
        this.invoiceDetailsService.initialize(this.invoiceID);
    }

    getStatusViewInfo(status: InvoiceStatus.StatusEnum): StatusViewInfo {
        const statusEnum = InvoiceStatus.StatusEnum;
        switch (status) {
            case statusEnum.Paid:
                return { color: Color.success, text: 'paid' };
            case statusEnum.Fulfilled:
                return { color: Color.success, text: 'fulfilled' };
            case statusEnum.Cancelled:
                return { color: Color.warn, text: 'cancelled' };
            case statusEnum.Unpaid:
                return { color: Color.pending, text: 'unpaid' };
        }
    }

    goToInvoiceDetails({ id }: Invoice) {
        this.router.navigate(['invoice', id]);
    }
}
