import { TextMaskConfig } from 'angular2-text-mask';

export const cardMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/],
    guide: false
};
