import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import isNil from 'lodash.isnil';
import isObject from 'lodash.isobject';

import { PaymentStatus } from '@dsh/api-codegen/capi';
import { ComponentChange, ComponentChanges } from '@dsh/type-utils';

import { StatusColor } from '../../../../../../../../../../theme-manager';
import { getPaymentStatusInfo } from '../../../../../../../../../get-payment-status-info';

@Component({
    selector: 'dsh-payment-status',
    templateUrl: './payment-status.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentStatusComponent implements OnChanges {
    @Input() status: PaymentStatus.StatusEnum;

    paymentColor: StatusColor;
    paymentStatus: string;

    ngOnChanges(changes: ComponentChanges<PaymentStatusComponent>): void {
        if (isObject(changes.status)) {
            this.updateStatusInfo(changes.status);
        }
    }

    private updateStatusInfo({ currentValue: paymentStatus }: ComponentChange<PaymentStatusComponent, 'status'>): void {
        if (isNil(paymentStatus)) {
            return;
        }
        const { status, color } = getPaymentStatusInfo(paymentStatus);
        this.paymentColor = color;
        this.paymentStatus = status;
    }
}
