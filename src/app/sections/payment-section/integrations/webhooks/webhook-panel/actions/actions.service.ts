import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { catchError } from 'rxjs/operators';

import { WebhooksService } from '../../../../../../api/webhooks';

@Injectable()
export class ActionsService {
    constructor(
        private webhooksService: WebhooksService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    remove(id: string) {
        return this.webhooksService.deleteWebhookByID(id).pipe(
            catchError(err => {
                console.error(err);
                this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                return 'error';
            })
        );
    }
}
