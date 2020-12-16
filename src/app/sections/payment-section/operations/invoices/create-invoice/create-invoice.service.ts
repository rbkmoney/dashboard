import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { filter, pluck, switchMap } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { ApiShopsService } from '@dsh/api/shop';

import { filterShopsByRealm } from '../../operators';
import { CreateInvoiceDialogComponent } from './components/create-invoice-dialog/create-invoice-dialog.component';

@Injectable()
export class CreateInvoiceService {
    invoiceCreated$: Observable<string>;

    private createInvoice$ = new Subject<PaymentInstitutionRealm>();
    private dialogResult$ = this.createInvoice$.pipe(
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
        filter((res) => res !== 'cancel')
    );

    constructor(private apiShopsService: ApiShopsService, private dialog: MatDialog) {
        this.invoiceCreated$ = this.dialogResult$.pipe(pluck('id'));
    }

    createInvoice(realm: PaymentInstitutionRealm): void {
        this.createInvoice$.next(realm);
    }
}
