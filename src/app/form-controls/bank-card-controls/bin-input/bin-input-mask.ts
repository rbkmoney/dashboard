import { TextMaskConfig } from 'angular2-text-mask';

export const binMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/],
    guide: false
};
