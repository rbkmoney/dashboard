import { TextMaskConfig } from 'angular2-text-mask';
import { AbstractControl } from '@angular/forms';

export function maskToValidator(maskConfig: TextMaskConfig) {
    const mask = maskConfig.mask as Array<string | RegExp>;
    const maskParts = mask.map(i => (i instanceof RegExp ? i.toString().slice(1, -1) : i));
    const regExp = new RegExp(maskParts.join(''));
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = regExp.test(control.value);
        return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
}
