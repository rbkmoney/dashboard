import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { Identity } from '../../../../../api-codegen/wallet-api/swagger-codegen';
import { ReceiveWebhooksService } from '../receive-webhooks.service';
import { CreateWebhookDialogComponent } from './create-webhook-dialog';

@Injectable()
export class CreateWebhookService {
    private createWebhook$ = new Subject<Identity[]>();

    constructor(private dialog: MatDialog, private receiveWebhooksService: ReceiveWebhooksService) {
        this.createWebhook$
            .pipe(
                switchMap((identities) =>
                    this.dialog
                        .open(CreateWebhookDialogComponent, { width: '560px', disableClose: true, data: identities })
                        .afterClosed()
                        .pipe(filter((r) => r === 'created'))
                )
            )
            .subscribe(() => {
                this.receiveWebhooksService.receiveWebhooks();
            });
    }

    createWebhook(identities: Identity[]) {
        this.createWebhook$.next(identities);
    }
}
