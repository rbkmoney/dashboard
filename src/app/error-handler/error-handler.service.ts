import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';

import { environment } from '../../environments';
import './init-sentry';
import { parseError } from './parse-error';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
    handleError(error: any): void {
        const parsedError = parseError(error);
        Sentry.captureException(parsedError.error);
        if (!environment.production) {
            console.error(error);
        }
    }
}
