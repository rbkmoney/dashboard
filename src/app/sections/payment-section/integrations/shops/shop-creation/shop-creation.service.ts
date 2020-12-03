import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { filter, take } from 'rxjs/operators';

import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';
import { CreateShopDialogResponse } from './create-russian-shop-entity/types/create-shop-dialog-response';
import { CreateShopDialogConfig } from './types/create-shop-dialog-config';

@Injectable()
export class ShopCreationService {
    constructor(
        private dialog: MatDialog,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    createShop(config: CreateShopDialogConfig): void {
        this.dialog
            .open<CreateShopDialogComponent, CreateShopDialogConfig>(CreateShopDialogComponent, {
                width: '552px',
                disableClose: true,
                autoFocus: false,
                data: config,
            })
            .afterClosed()
            .pipe(
                take(1),
                filter((response: CreateShopDialogResponse) => response === 'send')
            )
            .subscribe(() => {
                this.snackBar.open(this.transloco.translate('russianLegalEntity.created', null, 'create-shop'), 'OK');
            });
    }
}
