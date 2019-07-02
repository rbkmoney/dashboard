import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dsh-payment-tool',
    templateUrl: './payment-tool.component.html',
    styleUrls: ['./payment-tool.component.scss']
})
export class PaymentToolComponent implements OnInit {
    @Input() bankCard: string;

    constructor() {}

    ngOnInit() {}

    getFormattedBankCard = (): string => this.bankCard.replace(/(.{4})/g, '$& ');
}
