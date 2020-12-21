import { Component, Inject, Input, OnInit } from '@angular/core';

import { PaymentStatus } from '@dsh/api-codegen/capi';
import { LAYOUT_GAP } from '@dsh/app/sections/constants';

import { getPaymentStatusInfo, PaymentStatusInfo } from '../../../../../../../get-payment-status-info';
import { Payment } from '../../../../types/payment';

@Component({
    selector: 'dsh-payment-main-info',
    templateUrl: './payment-main-info.component.html',
    styleUrls: ['./payment-main-info.component.scss'],
})
export class PaymentMainInfoComponent implements OnInit {
    @Input() payment: Payment;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnInit(): void {}

    getStatusInfo(paymentStatus: PaymentStatus.StatusEnum): PaymentStatusInfo {
        return getPaymentStatusInfo(paymentStatus);
    }
}
