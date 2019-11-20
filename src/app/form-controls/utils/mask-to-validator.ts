import { TextMaskConfig } from 'angular2-text-mask';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function maskToValidator(maskConfig: TextMaskConfig, forbiddenName: string = 'maskValidator'): ValidatorFn {
    const mask = maskConfig.mask as Array<string | RegExp>;
    const maskParts = mask.map(i => (i instanceof RegExp ? i.toString().slice(1, -1) : i));
    const regExp = new RegExp(maskParts.join(''));
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value: string = control.value;
        if (!value) {
            return null;
        }
        const regExpMatch = value.match(regExp);
        const forbidden = regExpMatch ? regExpMatch[0] !== value : true;
        return forbidden ? { [forbiddenName]: { value: control.value } } : null;
    };
}
