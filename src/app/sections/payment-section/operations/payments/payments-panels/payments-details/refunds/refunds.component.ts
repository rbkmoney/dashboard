import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { filter, take } from 'rxjs/operators';

import { CreateRefundDialogResponse, CreateRefundService } from './create-refund';
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

    constructor(private refundsService: FetchRefundsService, private createRefundService: CreateRefundService) {}

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
                filter((response: CreateRefundDialogResponse) => response === CreateRefundDialogResponse.SUCCESS)
            )
            .subscribe(() => {
                this.updateRefunds();
            });
    }

    private updateRefunds(): void {
        this.refundsService.search({ invoiceID: this.invoiceID, paymentID: this.paymentID });
    }
}
