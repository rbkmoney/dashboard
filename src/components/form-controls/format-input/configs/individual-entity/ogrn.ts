import { TextMaskConfig } from 'angular2-text-mask';

import { regExpToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const OGRN_MASK: TextMaskConfig = {
    mask: new Array(15).fill(/\d/),
    guide: false,
};

export const ogrnValidator = regExpToValidator(/^(\d{13}|\d{15})$/, 'ogrn');

export const OGRN_CONFIG: FormatInputConfig = {
    mask: OGRN_MASK,
    placeholder: new Array(13).fill('0').join(''),
};
