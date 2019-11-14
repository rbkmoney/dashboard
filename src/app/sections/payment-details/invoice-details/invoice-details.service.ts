import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Invoice } from '../../../api-codegen/capi/swagger-codegen';
import { InvoiceSearchService } from '../../../api/search';
import { first, switchMap, shareReplay } from 'rxjs/operators';
import { takeError } from '../../../custom-operators';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class InvoiceDetailsService {
    private initialize$: Subject<string> = new Subject();

    invoice$: Observable<Invoice> = this.initialize$.pipe(
        first(),
        switchMap(invoiceID => this.invoiceSearchService.getInvoiceByDuration({ amount: 1, unit: 'y' }, invoiceID)),
        shareReplay(1)
    );
    invoiceError$: Observable<any> = this.invoice$.pipe(
        takeError,
        shareReplay(1)
    );

    constructor(private invoiceSearchService: InvoiceSearchService, private snackBar: MatSnackBar,
                private transloco: TranslocoService) {
        this.invoiceError$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    initialize(invoiceID: string) {
        this.initialize$.next(invoiceID);
    }
}
