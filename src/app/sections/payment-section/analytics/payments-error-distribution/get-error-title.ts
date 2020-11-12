import { translate } from '@ngneat/transloco';

import { ErrorDistribution } from './error-distribution';

export const getErrorTitle = (errors: ErrorDistribution[], selectedSubError: number[]): string =>
    selectedSubError.length
        ? selectedSubError.length === 1
            ? translate(`analytics.errorCodes.${errors[selectedSubError[0]].errorCode}`, null, 'payment-section')
            : getErrorTitle(errors[selectedSubError[0]].subErrors, selectedSubError.slice(1))
        : null;
