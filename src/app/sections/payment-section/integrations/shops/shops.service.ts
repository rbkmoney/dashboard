import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { filter, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ShopService } from '../../../../api';
import { progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { filterShopsByRealm } from '../../operations/operators';

@Injectable()
export class ShopsService {
    shops$ = this.route.params.pipe(
        pluck('realm'),
        filterShopsByRealm(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$ = progress(this.route.params, this.shops$).pipe(shareReplay(SHARE_REPLAY_CONF));

    constructor(
        private route: ActivatedRoute,
        private shopService: ShopService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    suspend(id: string) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopService.suspendShop(id))
            )
            .subscribe(
                () => {
                    this.snackBar.open(this.transloco.translate('suspend.success', null, 'shops'), 'OK', {
                        duration: 3000,
                    });
                    this.shopService.reloadShops();
                },
                () => this.snackBar.open(this.transloco.translate('suspend.error', null, 'shops'), 'OK')
            );
    }

    activate(id: string) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopService.activateShop(id))
            )
            .subscribe(
                () => {
                    this.snackBar.open(this.transloco.translate('activate.success', null, 'shops'), 'OK', {
                        duration: 3000,
                    });
                    this.shopService.reloadShops();
                },
                () => this.snackBar.open(this.transloco.translate('activate.error', null, 'shops'), 'OK')
            );
    }
}
