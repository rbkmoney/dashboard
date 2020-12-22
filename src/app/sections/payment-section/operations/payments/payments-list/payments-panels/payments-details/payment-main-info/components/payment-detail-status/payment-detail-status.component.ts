import { Component, Input, OnChanges } from '@angular/core';
import isNil from 'lodash.isnil';
import isObject from 'lodash.isobject';

import { PaymentStatus } from '@dsh/api-codegen/capi';

import { ComponentChange, ComponentChanges } from '../../../../../../../../../../../type-utils';
import { StatusColor } from '../../../../../../../../../../theme-manager';
import { getPaymentStatusInfo } from '../../../../../../../../../get-payment-status-info';

@Component({
    selector: 'dsh-payment-detail-status',
    templateUrl: './payment-detail-status.component.html',
    styleUrls: ['./payment-detail-status.component.scss'],
})
export class PaymentDetailStatusComponent implements OnChanges {
    @Input() status: PaymentStatus.StatusEnum;

    paymentColor: StatusColor;
    paymentStatus: string;

    ngOnChanges(changes: ComponentChanges<PaymentDetailStatusComponent>): void {
        if (isObject(changes.status)) {
            this.updateStatusInfo(changes.status);
        }
    }

    private updateStatusInfo({
        currentValue: paymentStatus,
    }: ComponentChange<PaymentDetailStatusComponent, 'status'>): void {
        if (isNil(paymentStatus)) {
            return;
        }
        const { status, color } = getPaymentStatusInfo(paymentStatus);
        this.paymentColor = color;
        this.paymentStatus = status;
    }
}
