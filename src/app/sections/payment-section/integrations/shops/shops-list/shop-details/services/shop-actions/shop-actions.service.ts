import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ApiShopsService } from '../../../../../../../../api/shop';
import { ShopActionResultEnum } from '../../enums';

@Injectable()
export class ShopActionsService {
    constructor(
        private shopService: ApiShopsService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    suspend(id: string): Observable<ShopActionResultEnum> {
        return this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopService.suspendShop(id)),
                map(() => {
                    this.snackBar.open(this.transloco.translate('suspend.success', null, 'shops'), 'OK', {
                        duration: 3000,
                    });
                    return ShopActionResultEnum.SUCCESS;
                }),
                catchError(() => {
                    this.snackBar.open(this.transloco.translate('suspend.error', null, 'shops'), 'OK');
                    return of(ShopActionResultEnum.ERROR);
                })
            );
    }

    activate(id: string): Observable<ShopActionResultEnum> {
        return this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopService.activateShop(id)),
                map(() => {
                    this.snackBar.open(this.transloco.translate('activate.success', null, 'shops'), 'OK', {
                        duration: 3000,
                    });
                    return ShopActionResultEnum.SUCCESS;
                }),
                catchError(() => {
                    this.snackBar.open(this.transloco.translate('activate.error', null, 'shops'), 'OK');
                    return of(ShopActionResultEnum.ERROR);
                })
            );
    }
}
