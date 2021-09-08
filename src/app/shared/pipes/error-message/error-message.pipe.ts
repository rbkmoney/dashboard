import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { CommonError } from '@dsh/app/shared';

@Pipe({ name: 'errorMessage' })
export class ErrorMessagePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(err: unknown): string {
        if (err instanceof CommonError) return err.message;
        return this.transloco.translate('errorOccurred');
    }
}
