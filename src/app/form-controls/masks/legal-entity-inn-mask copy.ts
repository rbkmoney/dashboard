import { TextMaskConfig } from 'angular2-text-mask';

export const legalEntityInnMask: TextMaskConfig = {
    mask: new Array(10).fill(/\d/),
    guide: false
};
