import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subject } from 'rxjs';
import { first, shareReplay, switchMap } from 'rxjs/operators';

import { Invoice } from '@dsh/api-codegen/capi/swagger-codegen';
import { InvoiceSearchService } from '@dsh/api/search';

import { takeError } from '../../../custom-operators';

@Injectable()
export class InvoiceDetailsService {
    private initialize$: Subject<string> = new Subject();

    invoice$: Observable<Invoice> = this.initialize$.pipe(
        first(),
        switchMap((invoiceID) => this.invoiceSearchService.getInvoiceByDuration({ amount: 3, unit: 'y' }, invoiceID)),
        shareReplay(1)
    );
    invoiceError$: Observable<any> = this.invoice$.pipe(takeError, shareReplay(1));

    constructor(
        private invoiceSearchService: InvoiceSearchService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.invoiceError$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    initialize(invoiceID: string) {
        this.initialize$.next(invoiceID);
    }
}
