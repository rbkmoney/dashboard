import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

import { PaymentSearchService } from '../../api/search';

@Injectable()
export class PaymentDetailsService {
    payment$ = this.route.params.pipe(
        switchMap(({ invoiceID, paymentID }) =>
            this.paymentSearchService.getPaymentByDuration({ amount: 3, unit: 'y' }, invoiceID, paymentID)
        ),
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );

    constructor(
        private paymentSearchService: PaymentSearchService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}
}
