import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api/shop';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ShopActionResult } from '../../types/shop-action-result';

@Injectable()
export class ShopActionsService {
    constructor(
        private shopService: ApiShopsService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    suspend(shopID: string): Observable<ShopActionResult> {
        return this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopService.suspendShop(shopID)),
                map(() => {
                    this.snackBar.open(this.transloco.translate('suspend.success', null, 'shops'), 'OK', {
                        duration: 3000,
                    });
                    return ShopActionResult.Success;
                }),
                catchError(() => {
                    this.snackBar.open(this.transloco.translate('suspend.error', null, 'shops'), 'OK');
                    return of(ShopActionResult.Error);
                })
            );
    }

    activate(shopID: string): Observable<ShopActionResult> {
        return this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopService.activateShop(shopID)),
                map(() => {
                    this.snackBar.open(this.transloco.translate('activate.success', null, 'shops'), 'OK', {
                        duration: 3000,
                    });
                    return ShopActionResult.Success;
                }),
                catchError(() => {
                    this.snackBar.open(this.transloco.translate('activate.error', null, 'shops'), 'OK');
                    return of(ShopActionResult.Error);
                })
            );
    }
}
