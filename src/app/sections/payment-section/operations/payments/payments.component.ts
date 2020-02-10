import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { PaymentsService } from './payments.service';
import { PaymentSearchFormValue } from './search-form';
import { SpinnerType } from '../../../../spinner';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [PaymentsService]
})
export class PaymentsComponent {
    tableData$ = this.paymentService.paymentsTableData$;
    hasMorePayments$ = this.paymentService.hasMore$;
    lastUpdated$ = this.paymentService.lastUpdated$;
    isLoading$ = this.paymentService.isLoading$;

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        private paymentService: PaymentsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.paymentService.errors$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    search(val: PaymentSearchFormValue) {
        this.paymentService.search(val);
    }

    fetchMore() {
        this.paymentService.fetchMore();
    }

    refresh() {
        this.paymentService.refresh();
    }
}
