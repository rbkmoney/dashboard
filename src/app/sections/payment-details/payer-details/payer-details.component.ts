import { Component, Input, OnChanges } from '@angular/core';

import { CustomerPayer, Payer, PaymentResourcePayer, RecurrentPayer } from '../../../api/capi/swagger-codegen';

enum PayerType {
    CustomerPayer = 'CustomerPayer',
    PaymentResourcePayer = 'PaymentResourcePayer',
    RecurrentPayer = 'RecurrentPayer'
}

@Component({
    selector: 'dsh-payer-details',
    templateUrl: './payer-details.component.html'
})
export class PayerDetailsComponent implements OnChanges {
    @Input() payer: Payer;

    @Input() layoutGap = '20px';

    customerPayer: CustomerPayer;
    paymentResourcePayer: PaymentResourcePayer;
    recurrentPayer: RecurrentPayer;

    payerEmail: string;

    localePath = 'sections.paymentDetails.payerDetails';

    ngOnChanges() {
        if (this.payer) {
            switch (this.payer.payerType) {
                case PayerType.CustomerPayer:
                    this.customerPayer = this.payer as CustomerPayer;
                    break;
                case PayerType.PaymentResourcePayer:
                    this.paymentResourcePayer = this.payer as PaymentResourcePayer;
                    this.payerEmail = this.paymentResourcePayer.contactInfo.email;
                    break;
                case PayerType.RecurrentPayer:
                    this.recurrentPayer = this.payer as RecurrentPayer;
                    this.payerEmail = this.recurrentPayer.contactInfo.email;
                    break;
            }
        }
    }
}
