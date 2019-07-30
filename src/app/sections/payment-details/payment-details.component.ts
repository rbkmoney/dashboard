import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import get from 'lodash.get';

import { PaymentSearchResult, PaymentToolDetails } from '../../api/capi/swagger-codegen';
import { PaymentDetailsService } from './payment-details.service';

@Component({
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss'],
    providers: [PaymentDetailsService]
})
export class PaymentDetailsComponent implements OnInit {
    payment$: Observable<PaymentSearchResult>;

    constructor(private route: ActivatedRoute, private paymentDetailsService: PaymentDetailsService) {}

    ngOnInit() {
        this.payment$ = this.paymentDetailsService.getPayment();
    }

    getPaymentToolDetails(payment: PaymentSearchResult): PaymentToolDetails {
        return get(payment, 'payer.paymentToolDetails') as PaymentToolDetails;
    }
}
