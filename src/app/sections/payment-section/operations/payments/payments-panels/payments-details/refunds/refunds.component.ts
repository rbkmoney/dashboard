import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/capi';

import { CreateRefundDialogResponse, CreateRefundDialogResponseStatus, CreateRefundService } from './create-refund';
import { FetchRefundsService } from './services/fetch-refunds/fetch-refunds.service';

@Component({
    selector: 'dsh-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundsComponent {
    @Input() invoiceID: string;
    @Input() paymentID: string;
    @Input() shopID: string;
    @Input() currency: string;
    @Input() maxRefundAmount: number;
    @Input() status: PaymentSearchResult.StatusEnum;

    @Output() statusChanged = new EventEmitter<void>();

    constructor(private refundsService: FetchRefundsService, private createRefundService: CreateRefundService) {}

    get isRefundAvailable(): boolean {
        return this.status === PaymentSearchResult.StatusEnum.Captured;
    }

    createRefund(): void {
        this.createRefundService
            .createRefund({
                invoiceID: this.invoiceID,
                paymentID: this.paymentID,
                shopID: this.shopID,
                currency: this.currency,
                maxRefundAmount: this.maxRefundAmount,
            })
            .pipe(
                take(1),
                filter(({ status }: CreateRefundDialogResponse) => status === CreateRefundDialogResponseStatus.SUCCESS)
            )
            .subscribe(({ availableAmount }) => {
                this.updateRefunds();
                if (availableAmount === 0) {
                    this.statusChanged.emit();
                }
            });
    }

    private updateRefunds(): void {
        this.refundsService.search({ invoiceID: this.invoiceID, paymentID: this.paymentID });
    }
}
