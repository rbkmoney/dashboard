import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { first, switchMap, shareReplay, map } from 'rxjs/operators';

import { booleanDelay, takeError } from '../../custom-operators';
import { Invoice } from '../../api-codegen/anapi/swagger-codegen';
import { InvoiceSearchService } from '../../api/search';

@Injectable()
export class InvoiceDetailsService {
    private initialize$: Subject<string> = new Subject();

    invoice$: Observable<Invoice> = this.initialize$.pipe(
        first(),
        switchMap(invoiceID => this.invoiceSearchService.getInvoiceByDuration({ amount: 1, unit: 'y' }, invoiceID)),
        shareReplay(1)
    );
    invoiceInitialized$: Observable<boolean> = this.invoice$.pipe(
        booleanDelay(500),
        map(r => !r)
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
