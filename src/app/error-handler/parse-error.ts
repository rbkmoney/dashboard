import { HttpErrorResponse } from '@angular/common/http';

export enum ErrorType {
    common,
    response,
    unknown,
}

export function parseError(error: any): { type: ErrorType; error: string | Error; originalError: any } {
    const originalError = error;

    // Try to unwrap zone.js error.
    // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
    if (error && error.ngOriginalError) {
        error = error.ngOriginalError;
    }

    // We can handle messages and Error objects directly.
    if (typeof error === 'string' || error instanceof Error) {
        return {
            error,
            originalError,
            type: ErrorType.common,
        };
    }

    // If it's http module error, extract as much information from it as we can.
    if (error instanceof HttpErrorResponse) {
        // The `error` property of http exception can be either an `Error` object, which we can use directly...
        if (error.error instanceof Error) {
            return {
                error: error.error,
                originalError,
                type: ErrorType.response,
            };
        }

        // ... or an`ErrorEvent`, which can provide us with the message but no stack...
        if (error.error instanceof ErrorEvent) {
            return {
                error: error.error.message,
                originalError,
                type: ErrorType.response,
            };
        }

        // ...or the request body itself, which we can use as a message instead.
        if (typeof error.error === 'string') {
            return {
                error: `Server returned code ${error.status} with body "${error.error}"`,
                originalError,
                type: ErrorType.response,
            };
        }

        // If we don't have any detailed information, fallback to the request message itself.
        return {
            error: error.message,
            originalError,
            type: ErrorType.response,
        };
    }

    // Skip if there's no error, and let user decide what to do with it.
    return {
        error: 'Handled unknown error',
        originalError,
        type: ErrorType.unknown,
    };
}
