import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler as AngularErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';

import { environment } from '../environments';
import { AppHttpErrorResponse } from './app-http-interceptor';

/**
 * Options used to configure the behavior of the Angular ErrorHandler.
 */
export interface ErrorHandlerOptions {
    logErrors?: boolean;
}

/**
 * Implementation of Angular's ErrorHandler provider that can be used as a drop-in replacement for the stock one.
 */
@Injectable({ providedIn: 'root' })
export class ErrorHandler implements AngularErrorHandler {
    private readonly options: ErrorHandlerOptions;

    constructor() {
        this.options = {
            logErrors: !environment.production,
        };
    }

    /**
     * Method called for every value captured through the ErrorHandler
     */
    public handleError(error: unknown): void {
        const extractedError = this.extractError(error) || 'Handled unknown error';

        this.captureChunkLoadError(extractedError);

        // Capture handled exception and send it to Sentry.
        Sentry.captureException(extractedError);

        if (this.options.logErrors) {
            // eslint-disable-next-line no-console
            console.error(extractedError);
        }
    }

    private captureChunkLoadError(error: { message?: string }): void {
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        const chunkLoadError = /ChunkLoadError [\d]+ failed/;
        const errorMessage = error?.message;
        if (!errorMessage) {
            return;
        }
        if (chunkFailedMessage.test(errorMessage) || chunkLoadError.test(errorMessage)) {
            // TODO Temporary log for checking error capture efficiency
            Sentry.captureMessage('Chunk load error captured');
            window.location.reload();
        }
    }

    /**
     * Default implementation of error extraction that handles default error wrapping, HTTP responses, ErrorEvent and few other known cases.
     */
    private extractError(errorCandidate: unknown): unknown {
        let error = errorCandidate;

        // Try to unwrap zone.js error.
        // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
        if (error && (error as { ngOriginalError: Error }).ngOriginalError) {
            error = (error as { ngOriginalError: Error }).ngOriginalError;
        }

        // We can handle messages and Error objects directly.
        if (typeof error === 'string' || error instanceof Error) {
            return error;
        }

        // If it's http module error, extract as much information from it as we can.
        if (error instanceof HttpErrorResponse) {
            if (error instanceof AppHttpErrorResponse) {
                Sentry.setTag('x-request-id', error.request.headers.get('x-request-id'));
            }

            // The `error` property of http exception can be either an `Error` object, which we can use directly...
            if (error.error instanceof Error) {
                return error.error;
            }

            // ... or an`ErrorEvent`, which can provide us with the message but no stack...
            if (error.error instanceof ErrorEvent && error.error.message) {
                return error.error.message;
            }

            // ...or the request body itself, which we can use as a message instead.
            if (typeof error.error === 'string') {
                return `Server returned code ${error.status} with body "${error.error}"`;
            }

            // If we don't have any detailed information, fallback to the request message itself.
            return error.message;
        }

        // Nothing was extracted, fallback to default error message.
        return null;
    }
}
