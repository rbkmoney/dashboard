import { ValidatorFn } from '@angular/forms';
import { TextMaskConfig } from 'angular2-text-mask';

import { regExpToValidator } from './regexp-to-validator';

export function maskToValidator(maskConfig: TextMaskConfig, forbiddenName: string = 'maskValidator'): ValidatorFn {
    const mask = maskConfig.mask as Array<string | RegExp>;
    const maskParts = mask.map(i => (i instanceof RegExp ? i.toString().slice(1, -1) : i));
    const regExp = new RegExp(`^${maskParts.join('')}$`);
    return regExpToValidator(regExp, forbiddenName);
}
