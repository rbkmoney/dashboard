import { ValidatorFn } from '@angular/forms';

export function regExpToValidator(
    regExp: RegExp,
    forbiddenName: string = 'regExpValidator',
    required = false
): ValidatorFn {
    return control => {
        const value: string = control.value;
        if (!required && !value) {
            return null;
        }
        return regExp.test(value) ? null : { [forbiddenName]: { value: control.value } };
    };
}
