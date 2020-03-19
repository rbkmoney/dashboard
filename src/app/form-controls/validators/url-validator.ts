import { ValidatorFn } from '@angular/forms';
import isUrl from 'is-url-superb';

export const urlValidator: ValidatorFn = control => {
    if (control.value && !isUrl(control.value)) {
        return { invalidUrl: control.value };
    }
    return null;
};
