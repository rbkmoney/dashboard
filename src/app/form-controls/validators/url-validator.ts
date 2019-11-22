import isUrl from 'is-url-superb';
import { ValidatorFn } from '@angular/forms';

export const urlValidator: ValidatorFn = control => {
    if (control.value && !isUrl(control.value)) {
        return { invalidUrl: control.value };
    }
    return null;
};
