import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { ErrorType, parseError } from '../error-handler';

@Injectable()
export class ErrorLoggerService {
    constructor(
        public snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private errorHandler: ErrorHandler
    ) {}

    notify(error: any) {
        this.errorHandler.handleError(error);
        const parsedError = parseError(error);
        let path: string;
        switch (parsedError.type) {
            case ErrorType.response:
                path = 'response';
                break;
            default:
                path = 'common';
        }
        this.transloco.selectTranslate(`errors.${path}`).subscribe((t) => this.snackBar.open(t, 'OK'));
    }
}
