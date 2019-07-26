import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
    Invoice,
    Payer,
    PaymentFlow,
    PaymentFlowHold,
    PaymentResourcePayer,
    PaymentSearchResult,
    PaymentToolDetails,
    Refund,
    Shop,
    ShopLocation,
    ShopLocationUrl
} from '../../api/capi/swagger-codegen';
import { PaymentDetailsService } from './payment-details.service';

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

    constructor(private route: ActivatedRoute, private paymentDetailsService: PaymentDetailsService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const invoiceID = params['invoiceID'];
            const paymentID = params['paymentID'];

            this.paymentDetailsService.getPayment(invoiceID, paymentID).subscribe(payment => (this.payment = payment));

            this.paymentDetailsService.getInvoiceByID(invoiceID).subscribe(invoice => {
                this.invoice = invoice;
                this.paymentDetailsService.getShopByID(invoice.shopID).subscribe(shop => {
                    this.shop = shop;
                });
            });
        });
    }

    getPaymentToolDetails = (payer: Payer): PaymentToolDetails => (payer as PaymentResourcePayer).paymentToolDetails;

    getHoldDate = (flow: PaymentFlow): string => (flow as PaymentFlowHold).heldUntil.toString();

    getUrl = (shopLocation: ShopLocation): string => (shopLocation as ShopLocationUrl).url;
}
