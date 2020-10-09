import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const oneMustBeSelected: ValidatorFn = (control: FormGroup): ValidationErrors | null =>
    control.value.map((c) => c.selected).includes(true) ? null : { Error: 'At least one of checkboxes select needed' };
