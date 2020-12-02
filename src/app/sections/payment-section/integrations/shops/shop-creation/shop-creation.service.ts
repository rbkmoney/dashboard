import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { filter, take } from 'rxjs/operators';

import { CreateShopDialogComponent } from './components/create-shop-dialog/create-shop-dialog.component';
import { CreateShopDialogResponse } from './create-russian-shop-entity/types/create-shop-dialog-response';

@Injectable()
export class ShopCreationService {
    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    createShop(): void {
        this.dialog
            .open(CreateShopDialogComponent, {
                width: '552px',
                maxHeight: '90vh',
                disableClose: true,
                autoFocus: false,
                data: {
                    realm: this.route.snapshot.params.realm,
                },
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
