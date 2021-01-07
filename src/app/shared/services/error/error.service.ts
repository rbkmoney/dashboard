import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { NotificationService } from '../notification';

// TODO: collect error information
@Injectable()
export class ErrorService {
    constructor(private notificationService: NotificationService, private transloco: TranslocoService) {}

    error(error: Error | any, message?: string): MatSnackBarRef<SimpleSnackBar> {
        if (error instanceof TypeError) {
            return this.notificationService.error(this.transloco.translate('notification.error'));
        }
        if (error instanceof HttpErrorResponse) {
            return this.notificationService.error(this.transloco.translate('notification.httpError'));
        }

        return this.notificationService.error(message);
    }
}
