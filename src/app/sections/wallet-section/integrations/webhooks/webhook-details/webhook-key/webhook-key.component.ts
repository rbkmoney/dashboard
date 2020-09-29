import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'dsh-webhook-key',
    templateUrl: 'webhook-key.component.html',
    styleUrls: ['webhook-key.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebhookKeyComponent {
    @Input()
    key: string;

    constructor(private snackBar: MatSnackBar, private transloco: TranslocoService) {}

    copied(isCopied: boolean) {
        this.snackBar.open(this.transloco.translate(isCopied ? 'copied' : 'copyFailed'), 'OK', { duration: 1000 });
    }
}
