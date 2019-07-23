import { Component, Input, OnInit } from '@angular/core';

import { PaymentTerminalDetails } from '../../../../api/capi/swagger-codegen';

@Component({
    selector: 'dsh-payment-terminal',
    templateUrl: './payment-terminal.component.html'
})
export class PaymentTerminalComponent {
    @Input() paymentTerminal: PaymentTerminalDetails;

    localePath = 'sections.paymentDetails.paymentTool';
}
