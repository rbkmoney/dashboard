import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { of, ReplaySubject } from 'rxjs';
import { filter, pluck, switchMap, take } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ApiShopsService } from '@dsh/api/shop';

import { filterShopsByRealm } from '../../operators';
import { CreateInvoiceDialogComponent } from './components/create-invoice-dialog/create-invoice-dialog.component';

@Injectable()
export class CreateInvoiceService {
    invoiceCreated$ = new ReplaySubject<string>(1);

    constructor(
        private apiShopsService: ApiShopsService,
        private dialog: MatDialog,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    createInvoice(realm: PaymentInstitutionRealm): void {
        of(realm)
            .pipe(
                filterShopsByRealm(this.apiShopsService.shops$),
                switchMap((shops) =>
                    this.dialog
                        .open<CreateInvoiceDialogComponent, Shop[]>(CreateInvoiceDialogComponent, {
                            width: '720px',
                            maxHeight: '90vh',
                            disableClose: true,
                            data: shops,
                        })
                        .afterClosed()
                ),
                take(1),
                filter((res) => res !== 'cancel'),
                pluck('id')
            )
            .subscribe((id) => {
                this.invoiceCreated$.next(id);
                this.snackBar.open(
                    this.transloco.translate('invoices.actions.invoiceCreated', null, 'operations'),
                    'OK',
                    {
                        duration: 2000,
                    }
                );
            });
    }
}
