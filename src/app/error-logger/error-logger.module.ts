import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ErrorLoggerService } from './error-logger.service';

@NgModule({
    imports: [MatSnackBarModule, TranslocoModule],
    providers: [ErrorLoggerService],
})
export class ErrorLoggerModule {}
