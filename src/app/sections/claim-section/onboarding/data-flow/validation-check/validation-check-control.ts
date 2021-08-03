import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function hasChildrenControls(control: AbstractControl): control is FormGroup | FormArray {
    return !!(control as any).controls;
}

export function validationCheckControl(control: AbstractControl): boolean {
    control.markAsTouched();
    control.markAsDirty();
    control.updateValueAndValidity();
    if (hasChildrenControls(control)) {
        Object.values(control.controls).forEach(validationCheckControl);
    }
    return control.valid;
}
