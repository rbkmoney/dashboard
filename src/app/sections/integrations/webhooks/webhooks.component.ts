import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { LAYOUT_GAP } from '../../constants';
import { CreateWebhookComponent } from './create-webhook/create-webhook.component';
import { ReceiveWebhooksService } from './receive-webhooks.service';

@Component({
    templateUrl: 'webhooks.component.html',
    providers: [ReceiveWebhooksService]
})
export class WebhooksComponent implements OnInit {
    webhooks$ = this.receiveWebhooksService.webhooks$;

    constructor(
        private receiveWebhooksService: ReceiveWebhooksService,
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.receiveWebhooksService.receiveWebhooks();
    }

    createWebhook() {
        this.matDialog
            .open(CreateWebhookComponent, { width: '560px', disableClose: true })
            .afterClosed()
            .pipe(filter(r => r))
            .subscribe(_ => this.receiveWebhooksService.receiveWebhooks());
    }
}
