import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subject } from 'rxjs';
import { first, map, shareReplay, switchMap } from 'rxjs/operators';

import { Invoice } from '../../api-codegen/anapi/swagger-codegen';
import { InvoiceSearchService } from '../../api/search';
import { booleanDebounceTime, SHARE_REPLAY_CONF, takeError } from '../../custom-operators';

@Injectable()
export class InvoiceDetailsService {
    private initialize$: Subject<string> = new Subject();

    invoice$: Observable<Invoice> = this.initialize$.pipe(
        first(),
        switchMap(invoiceID => this.invoiceSearchService.getInvoiceByDuration({ amount: 3, unit: 'y' }, invoiceID)),
        shareReplay(SHARE_REPLAY_CONF)
    );
    invoiceInitialized$: Observable<boolean> = this.invoice$.pipe(
        booleanDebounceTime(),
        map(r => !r),
        shareReplay(SHARE_REPLAY_CONF)
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
