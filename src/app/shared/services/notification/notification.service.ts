import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

const DEFAULT_DURATION_MS = 3000;

@Injectable()
export class NotificationService {
    constructor(private snackBar: MatSnackBar, private transloco: TranslocoService) {}

    success(message: string = this.transloco.translate('notification.success')): MatSnackBarRef<SimpleSnackBar> {
        return this.openSnackBar(message);
    }

    error(message: string = this.transloco.translate('notification.error')): MatSnackBarRef<SimpleSnackBar> {
        return this.openSnackBar(message);
    }

    private openSnackBar(message: string, config: MatSnackBarConfig<unknown> = {}): MatSnackBarRef<SimpleSnackBar> {
        return this.snackBar.open(message, this.transloco.translate('notification.ok'), {
            duration: DEFAULT_DURATION_MS,
            ...config,
        });
    }
}
