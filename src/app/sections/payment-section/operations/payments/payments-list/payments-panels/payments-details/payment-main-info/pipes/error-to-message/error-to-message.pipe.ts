import { Pipe, PipeTransform } from '@angular/core';
import { translate } from '@ngneat/transloco';

import { PaymentError } from '@dsh/api-codegen/capi/swagger-codegen';

@Pipe({
    name: 'errorToMessage',
})
export class ErrorToMessagePipe implements PipeTransform {
    transform(error: PaymentError): string {
        return mapErrors(error);
    }
}

const mapErrors = ({ code, subError }: PaymentError, accCode: string = 'paymentErrors', acc: string = ''): string => {
    const getTranslation = (path: string) => {
        const errorTranslation = translate(path);
        return errorTranslation && errorTranslation !== path ? errorTranslation : translate('unknownError');
    };
    const translationPath = accCode ? `${accCode}.${code}` : code;
    if (subError) {
        const message = getTranslation(`${translationPath}.message`);
        return mapErrors(subError, translationPath, acc.concat(acc === '' ? message : ` -> ${message}`));
    } else {
        const message = getTranslation(translationPath);
        return acc === '' ? message : `${acc} -> ${message}.`;
    }
};
