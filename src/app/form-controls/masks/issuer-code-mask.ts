import { TextMaskConfig } from 'angular2-text-mask';

export const issuerCodeMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    guide: false
};
