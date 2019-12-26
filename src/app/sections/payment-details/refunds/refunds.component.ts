import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

import { RefundsService } from './refunds.service';
import { LAYOUT_GAP } from '../../constants';

@Component({
    selector: 'dsh-refunds',
    templateUrl: './refunds.component.html',
    styleUrls: ['./refunds.component.scss'],
    providers: [RefundsService]
})
export class RefundsComponent implements OnChanges {
    @Input() invoiceID: string;
    @Input() paymentID: string;
    @Input() shopID: string;
    @Input() maxRefundAmount: number;

    refunds$ = this.refundsService.searchResult$.pipe(
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );
    hasMoreRefunds$ = this.refundsService.hasMore$;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
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
        this.refundsService.createRefund(this.shopID, this.invoiceID, this.paymentID, this.maxRefundAmount);
    }

    fetchMore() {
        this.refundsService.fetchMore();
    }
}
