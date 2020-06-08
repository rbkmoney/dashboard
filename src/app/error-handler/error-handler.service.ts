import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';

import { environment } from '../../environments';
import './init-sentry';
import { parseError } from './parse-error';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
    handleError(error: any): void {
        if (environment.production) {
            const parsedError = parseError(error);
            Sentry.captureException(parsedError.error);
        } else {
            console.error(error);
        }
    }
}
