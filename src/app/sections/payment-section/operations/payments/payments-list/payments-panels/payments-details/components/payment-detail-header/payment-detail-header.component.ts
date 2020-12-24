import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-payment-detail-header',
    templateUrl: './payment-detail-header.component.html',
})
export class PaymentDetailHeaderComponent {
    @Input() order: number;
    @Input() changedDate: string;
}
