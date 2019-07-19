import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
    Invoice,
    InvoicesService,
    PaymentSearchResult,
    PaymentToolDetailsBankCard,
    PayoutToolDetailsBankCard,
    Refund,
    Shop
} from '../../api/capi/swagger-codegen';
import { PaymentDetailsService } from './payment-details.service';
import PaymentSystemEnum = PaymentToolDetailsBankCard.PaymentSystemEnum;

@Component({
    selector: 'dsh-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [PaymentDetailsService]
})
export class PaymentDetailsComponent implements OnInit {
    @Input() payment: PaymentSearchResult;

    invoiceID: string;

    paymentID: string;

    invoice: Invoice;

    shop: Shop;

    refunds: Refund[];

    payoutToolDetailsBankCard: PayoutToolDetailsBankCard;

    constructor(
        private route: ActivatedRoute,
        private paymentDetailsService: PaymentDetailsService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.invoiceID = params['invoiceID'];
            this.paymentID = params['paymentID'];
            this.paymentDetailsService.searchPayments(this.invoiceID, this.paymentID).subscribe((payments) => {
                this.payment = payments.result[0];
            });
            this.paymentDetailsService.getInvoiceByID(this.invoiceID).subscribe((invoice) => {
                this.invoice = invoice;
                this.paymentDetailsService.getShopByID(invoice.shopID).subscribe((shop) => {
                   this.shop = shop;
                });
            });
        });

        this.payoutToolDetailsBankCard = {
            detailsType: 'PaymentToolDetailsBankCard',
            cardNumberMask: '847837******3457',
            paymentSystem: PaymentSystemEnum.Mastercard
        };
    }
}
