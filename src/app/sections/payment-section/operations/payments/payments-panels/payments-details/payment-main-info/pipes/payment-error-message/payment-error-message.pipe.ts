import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import isEmpty from 'lodash-es/isEmpty';
import isObject from 'lodash-es/isObject';

import { PaymentError } from '@dsh/api-codegen/capi/swagger-codegen';
import { isString } from '@dsh/utils';

@Pipe({
    name: 'paymentErrorMessage',
})
export class PaymentErrorMessagePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(error: PaymentError): string {
        return this.formatErrors(error);
    }

    private formatErrors(error: PaymentError): string {
        let curError: PaymentError = error;
        let translationPath = 'paymentErrors';
        let errorsMessage = '';

        while (isObject(curError)) {
            const { code, subError } = curError;
            let message: string;
            translationPath = `${translationPath}.${code}`;

            if (isObject(subError)) {
                curError = subError;
                message = this.translateError(`${translationPath}.message`);
            } else {
                curError = null;
                message = this.translateError(translationPath);
            }

            errorsMessage = isEmpty(errorsMessage) ? message : `${errorsMessage} -> ${message}`;
        }

        return errorsMessage;
    }

    private translateError(path: string): string {
        const translation = this.transloco.translate(path);
        return isString(translation) && translation !== path ? translation : this.transloco.translate('unknownError');
    }
}
