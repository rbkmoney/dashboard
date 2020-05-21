import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { WebhooksService } from '../../../../../../api/webhooks';
import { ReceiveWebhooksService } from '../../receive-webhooks.service';

@Injectable()
export class RemoveWebhookService {
    private removeWebhook$: Subject<string> = new Subject();

    constructor(
        private dialog: MatDialog,
        private receiveWebhooksService: ReceiveWebhooksService,
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.removeWebhook$
            .pipe(
                switchMap((webhookID) => forkJoin([of(webhookID), this.openConfirmDialog()])),
                switchMap(([webhookID]) =>
                    this.webhooksService.deleteWebhookByID(webhookID).pipe(
                        catchError((err) => {
                            console.error(err);
                            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                            return 'error';
                        })
                    )
                )
            )
            .subscribe(() => {
                this.receiveWebhooks();
            });
    }

    removeWebhook(webhookID: string) {
        this.removeWebhook$.next(webhookID);
    }

    private receiveWebhooks() {
        this.receiveWebhooksService.receiveWebhooks();
    }

    private openConfirmDialog() {
        return this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(filter((r) => r === 'confirm'));
    }
}
