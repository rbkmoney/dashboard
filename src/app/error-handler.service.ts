import { ErrorHandler as AngularErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';

import { extractError } from '@dsh/utils';

import { environment } from '../environments';

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
        const extractedError = extractError(error) || 'Handled unknown error';

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
}
