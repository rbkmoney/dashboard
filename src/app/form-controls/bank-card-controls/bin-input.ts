import { TextMaskConfig } from 'angular2-text-mask';

import { createCustomInputWithMask } from '../custom-input-with-mask';

export const binMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/],
    guide: false
};

export const binInput = createCustomInputWithMask({
    selector: 'dsh-bin-input',
    mask: binMask,
    placeholder: '0000 00',
    postfix: '** **** ****'
});
