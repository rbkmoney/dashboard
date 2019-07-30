import { Component, Input, OnInit } from '@angular/core';

import { RecurrentPayer } from '../../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-recurrent-payer',
    templateUrl: './recurrent-payer.component.html'
})
export class RecurrentPayerComponent implements OnInit {
    @Input() recurrentPayer: RecurrentPayer;

    @Input() layoutGap = '20px';

    localePath = 'sections.paymentDetails.payerDetails';

    constructor() {}

    ngOnInit() {}
}
