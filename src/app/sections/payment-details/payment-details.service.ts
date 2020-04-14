import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

import { PaymentSearchService } from '../../api/search';
import { progress } from '../../custom-operators';

@Injectable()
export class PaymentDetailsService {
    params$ = this.route.params;

    payment$ = this.params$.pipe(
        switchMap(({ invoiceID, paymentID }) =>
            this.paymentSearchService.getPaymentByDuration({ amount: 3, unit: 'y' }, invoiceID, paymentID)
        ),
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );

    isLoading$ = progress(this.params$, this.payment$);

    constructor(
        private paymentSearchService: PaymentSearchService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}
}
