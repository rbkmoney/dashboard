import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, shareReplay, switchMap, take } from 'rxjs/operators';

import { IdentityService } from '../../../../../api/identity';
import { ReceiveWebhooksService } from '../receive-webhooks.service';
import { CreateWebhookDialogComponent } from './create-webhook-dialog.component';

@Injectable()
export class CreateWebhookService {
    private createWebhook$ = new Subject<void>();

    constructor(
        private dialog: MatDialog,
        private receiveWebhooksService: ReceiveWebhooksService,
        private identityService: IdentityService
    ) {
        this.createWebhook$
            .pipe(
                switchMap(() => this.identityService.identities$.pipe(shareReplay(1), take(1))),
                switchMap((identities) =>
                    this.dialog
                        .open(CreateWebhookDialogComponent, { width: '552px', disableClose: true, data: identities })
                        .afterClosed()
                        .pipe(filter((r) => r === 'created'))
                )
            )
            .subscribe(() => {
                this.receiveWebhooksService.receiveWebhooks();
            });
    }

    createWebhook() {
        this.createWebhook$.next();
    }
}
