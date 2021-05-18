import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter, pluck, switchMap, take } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ApiShopsService } from '@dsh/api/shop';

import { filterShopsByRealm } from '../../operators';
import { CreateInvoiceDialogComponent } from './components/create-invoice-dialog/create-invoice-dialog.component';

@Injectable()
export class CreateInvoiceService {
    constructor(
        private apiShopsService: ApiShopsService,
        private dialog: MatDialog,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    createInvoice(realm: PaymentInstitutionRealm): Observable<string> {
        const invoiceCreated$ = new ReplaySubject<string>(1);
        of(realm)
            .pipe(
                filterShopsByRealm(this.apiShopsService.shops$),
                switchMap((shops) =>
                    this.dialog
                        .open<CreateInvoiceDialogComponent, Shop[]>(CreateInvoiceDialogComponent, {
                            width: '720px',
                            data: shops,
                        })
                        .afterClosed()
                ),
                take(1),
                filter((res) => res !== 'cancel'),
                pluck('id')
            )
            .subscribe((id) => {
                invoiceCreated$.next(id);
                this.snackBar.open(
                    this.transloco.translate('invoices.actions.invoiceCreated', null, 'operations'),
                    'OK',
                    {
                        duration: 2000,
                    }
                );
            });
        return invoiceCreated$;
    }
}
