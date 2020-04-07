import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ReceiveWebhooksService } from '../../receive-webhooks.service';
import { ActionsService } from './actions.service';

@Component({
    selector: 'dsh-actions',
    templateUrl: 'actions.component.html',
    providers: [ActionsService]
})
export class ActionsComponent {
    @Input()
    webhookID: string;

    constructor(
        private dialog: MatDialog,
        private actionsService: ActionsService,
        private receiveWebhooksService: ReceiveWebhooksService
    ) {}

    delete() {
        const dialog = this.dialog.open(ConfirmActionDialogComponent);
        dialog
            .afterClosed()
            .pipe(
                filter(r => r === 'confirm'),
                switchMap(_ => this.actionsService.remove(this.webhookID)),
                filter(r => r !== 'error')
            )
            .subscribe(() => {
                this.receiveWebhooksService.receiveWebhooks();
            });
    }
}
