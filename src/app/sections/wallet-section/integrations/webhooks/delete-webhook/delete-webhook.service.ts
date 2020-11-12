import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { WalletWebhooksService } from '../../../../../api';
import { DeleteWebhookParams } from '../webhook-details/webhook-actions';

@Injectable()
export class DeleteWebhookService {
    private destroy$: Subject<void> = new Subject();
    private deleteWebhook$: Subject<DeleteWebhookParams> = new Subject();
    private deleted$: Subject<void> = new Subject();

    webhookDeleted$: Observable<void> = this.deleted$.asObservable();

    constructor(
        private dialog: MatDialog,
        private walletWebhooksService: WalletWebhooksService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar
    ) {}

    deleteWebhook(params: DeleteWebhookParams) {
        this.deleteWebhook$.next(params);
    }

    init() {
        this.deleteWebhook$
            .pipe(
                takeUntil(this.destroy$),
                switchMap((params) =>
                    combineLatest([
                        of(params),
                        this.dialog
                            .open(ConfirmActionDialogComponent)
                            .afterClosed()
                            .pipe(filter((r) => r === 'confirm')),
                    ])
                ),
                switchMap(([{ webhookID, identityID }]) =>
                    this.walletWebhooksService.deleteWebhookByID(webhookID, identityID).pipe(
                        catchError((e) => {
                            console.error(e);
                            this.snackBar.open(
                                this.transloco.translate('errors.deleteError', null, 'wallet-webhooks'),
                                'OK'
                            );
                            return of('error');
                        })
                    )
                ),
                filter((result) => result !== 'error')
            )
            .subscribe(() => this.deleted$.next());
    }

    destroy() {
        this.destroy$.next();
    }
}
