import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { Invoice } from '@dsh/api-codegen/anapi/swagger-codegen';
import { InvoiceSearchService } from '@dsh/api/search';
import { NotificationService } from '@dsh/app/shared/services';
import { takeError } from '@dsh/operators';

@UntilDestroy()
@Injectable()
export class InvoiceDetailsService {
    invoice$: Observable<Invoice>;
    error$: Observable<unknown>;

    private invoiceId$ = new ReplaySubject<string>();

    constructor(private invoiceSearchService: InvoiceSearchService, private notificationService: NotificationService) {
        this.initInvoice();
        this.initInvoiceErrors();
    }

    setInvoiceID(invoiceID: string): void {
        this.invoiceId$.next(invoiceID);
    }

    private initInvoice(): void {
        this.invoice$ = this.invoiceId$.pipe(
            switchMap((invoiceID: string) =>
                this.invoiceSearchService.getInvoiceByDuration({ amount: 3, unit: 'y' }, invoiceID)
            ),
            shareReplay(1)
        );
    }

    private initInvoiceErrors(): void {
        this.error$ = this.invoice$.pipe(takeError, shareReplay(1));
        this.error$.pipe(untilDestroyed(this)).subscribe(() => {
            this.notificationService.error();
        });
    }
}
