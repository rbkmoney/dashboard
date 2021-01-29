import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { NotificationService } from '../notification';
import { CommonError } from './models/common-error';

// TODO: collect error information
@Injectable()
export class ErrorService {
    constructor(private notificationService: NotificationService, private transloco: TranslocoService) {}

    error(error: Error): MatSnackBarRef<SimpleSnackBar> {
        if (error instanceof TypeError) {
            return this.notificationService.error(this.transloco.translate('notification.error'));
        }
        if (error instanceof HttpErrorResponse) {
            return this.notificationService.error(this.transloco.translate('notification.httpError'));
        }
        if (error instanceof CommonError) {
            return this.notificationService.error(error.message);
        }

        return this.notificationService.error(this.transloco.translate('notification.error'));
    }
}
