import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { ErrorResult } from '@dsh/app/shared/services/error/models/error-result';

import { NotificationService } from '../notification';
import { CommonError } from './models/common-error';

@Injectable()
export class ErrorService {
    constructor(private notificationService: NotificationService, private transloco: TranslocoService) {}

    // TODO: collect and dev log error information
    error(error: unknown, notify = true): ErrorResult {
        const errorResult: ErrorResult = { error: this.parse(error) };
        if (notify) {
            errorResult.notification = this.notificationService.error(errorResult.error.message);
        }
        return errorResult;
    }

    private parse(error: unknown): CommonError {
        if (error instanceof CommonError) {
            return error;
        }
        if (error instanceof TypeError) {
            return new CommonError(this.transloco.translate('notification.error'));
        }
        if (error instanceof HttpErrorResponse) {
            return new CommonError(this.transloco.translate('notification.httpError'));
        }
        return new CommonError(this.transloco.translate('notification.error'));
    }
}
