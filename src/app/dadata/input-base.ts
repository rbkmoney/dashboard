import { ErrorStateMatcher, CanUpdateErrorStateCtor, mixinErrorState } from '@angular/material';
import { NgForm, FormGroupDirective, NgControl } from '@angular/forms';

export class InputBase {
    constructor(
        public _defaultErrorStateMatcher: ErrorStateMatcher,
        public _parentForm: NgForm,
        public _parentFormGroup: FormGroupDirective,
        public ngControl: NgControl
    ) {}
}
export const MatInputMixinBase: CanUpdateErrorStateCtor & typeof InputBase = mixinErrorState(InputBase);
