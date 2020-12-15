import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

const DEFAULT_DURATION_MS = 3000;

@Injectable()
export class NotificationService {
    constructor(private snackBar: MatSnackBar, private transloco: TranslocoService) {}

    success(message: string = this.transloco.translate('notification.success')) {
        return this.snackBar.open(message, this.transloco.translate('notification.ok'), {
            duration: DEFAULT_DURATION_MS,
        });
    }

    error(message: string = this.transloco.translate('notification.error')) {
        return this.snackBar.open(message, this.transloco.translate('notification.ok'), {
            duration: DEFAULT_DURATION_MS,
        });
    }
}
