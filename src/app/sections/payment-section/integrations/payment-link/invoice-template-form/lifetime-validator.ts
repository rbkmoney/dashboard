import { AbstractControl, ValidatorFn } from '@angular/forms';

export function lifetimeValidator(control: AbstractControl): ReturnType<ValidatorFn> {
    const valid = Object.values(control.value).some((value: any) => value > 0);
    return valid ? null : { lifetime: 'need some days, month or years value' };
}
