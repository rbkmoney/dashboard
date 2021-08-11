import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { filter, take } from 'rxjs/operators';

import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';

@Injectable()
export class ShopCreationService {
    constructor(private dialog: MatDialog, private transloco: TranslocoService, private snackBar: MatSnackBar) {}

    createShop(): void {
        this.dialog
            .open<CreateShopDialogComponent>(CreateShopDialogComponent)
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
