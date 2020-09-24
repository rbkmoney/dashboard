import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { CreateWebhookComponent } from './create-webhook/create-webhook.component';
import { ReceiveWebhooksService } from './receive-webhooks.service';

@Injectable()
export class CreateWebhookService {
    private createWebhook$ = new Subject();

    constructor(private dialog: MatDialog, private receiveWebhooksService: ReceiveWebhooksService) {
        this.createWebhook$.pipe(switchMap(() => this.openCreateClaimDialog())).subscribe(() => {
            this.receiveWebhooksService.receiveWebhooks();
        });
    }

    createWebhook() {
        this.createWebhook$.next();
    }

    private openCreateClaimDialog() {
        return this.dialog
            .open(CreateWebhookComponent, { width: '552px', disableClose: true })
            .afterClosed()
            .pipe(filter((r) => r === 'created'));
    }
}
