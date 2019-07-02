import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-payment-tool',
    templateUrl: './payment-tool.component.html'
})
export class PaymentToolComponent {
    @Input() bankCard: string;

    getFormattedBankCard = (): string => this.bankCard.replace(/(.{4})/g, '$& ');
}
