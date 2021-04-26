import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { catchError } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi/swagger-codegen';

import { RefundsService } from './refunds.service';

const PAYMENT_STATUSES = PaymentSearchResult.StatusEnum;

@Component({
    selector: 'dsh-refunds',
    templateUrl: 'refunds.component.html',
    styleUrls: ['./refunds.component.scss'],
    providers: [RefundsService],
})
export class RefundsComponent implements OnChanges {
    @Input() invoiceID: string;
    @Input() paymentID: string;
    @Input() shopID: string;
    @Input() currency: string;
    @Input() status: PaymentSearchResult.StatusEnum;
    @Input() maxRefundAmount: number;

    refunds$ = this.refundsService.searchResult$.pipe(
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );
    hasMoreRefunds$ = this.refundsService.hasMore$;

    constructor(
        public refundsService: RefundsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnChanges({ invoiceID, paymentID }: SimpleChanges) {
        if (invoiceID.currentValue && paymentID.currentValue) {
            this.refundsService.search({ invoiceID: invoiceID.currentValue, paymentID: paymentID.currentValue });
        }
    }

    createRefund() {
        this.refundsService.createRefund(
            this.shopID,
            this.invoiceID,
            this.paymentID,
            this.maxRefundAmount,
            this.currency
        );
    }

    fetchMore() {
        this.refundsService.fetchMore();
    }

    refundAvailable(): boolean {
        return this.status === PAYMENT_STATUSES.Captured;
    }
}
