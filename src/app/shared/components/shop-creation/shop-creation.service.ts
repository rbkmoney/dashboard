import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';

import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';

@Injectable({
    providedIn: 'root',
})
export class ShopCreationService {
    constructor(private dialog: MatDialog, private transloco: TranslocoService, private snackBar: MatSnackBar) {}

    createShop(shops$: Observable<Shop[]>): void {
        this.dialog
            .open<CreateShopDialogComponent>(CreateShopDialogComponent, { data: { shops$ } })
            .afterClosed()
            .pipe(
                take(1),
                filter((response) => response === 'send')
            )
            .subscribe(() => {
                this.snackBar.open(this.transloco.translate('russianLegalEntity.created', null, 'create-shop'), 'OK');
            });
    }
}
