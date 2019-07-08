import { Component, Input, OnInit } from '@angular/core';

import { ClientInfo, ContactInfo, Payer } from '../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-payer-details',
    templateUrl: './payer-details.component.html'
})
export class PayerDetailsComponent implements OnInit {
    @Input() payer: Payer;

    contactInfo: ContactInfo;
    clientInfo: ClientInfo;

    private localePath = 'sections.paymentDetails.payerDetails';

    ngOnInit() {
        this.contactInfo = {
            email: 'payer@mail.com'
        };

        this.clientInfo = {
            ip: '2A04:4A00:5:966:80E8:ACEC:D40:D5D5',
            fingerprint: 'ca35b70d7582a867e415d22d018e18c7'
        };
    }
}
