import { Component, Inject, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { LAYOUT_GAP } from '../../../../sections/constants';

@Component({
    selector: 'dsh-webhook-api-key',
    templateUrl: 'webhook-api-key.component.html',
    styleUrls: ['webhook-api-key.component.scss'],
})
export class WebhookApiKeyComponent {
    @Input()
    key: string;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    copied(isCopied: boolean) {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }
}
