import { TextMaskConfig } from 'angular2-text-mask';

export const individualEntityInnMask: TextMaskConfig = {
    mask: new Array(12).fill(/\d/),
    guide: false
};
