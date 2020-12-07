import { AbstractControl, FormArray, FormControl, FormGroup } from '@ngneat/reactive-forms';
import isEmpty from 'lodash.isempty';
import isNil from 'lodash.isnil';

export function getAbstractControl<Control extends AbstractControl, GroupType = unknown>(
    form: FormGroup<GroupType>,
    path: string
) {
    if (isEmpty(path)) {
        throw new Error(`Path can't be an emtpy string`);
    }
    if (isNil(form.get(path))) {
        throw new Error(`Can't get a control by path "${path}"`);
    }
    return form.get(path) as Control;
}

export function getFormControl<Control extends FormControl, GroupType = unknown>(
    form: FormGroup<GroupType>,
    path: string
) {
    return getAbstractControl<Control, GroupType>(form, path);
}

export function getFormArray<Control extends FormArray, GroupType = unknown>(form: FormGroup<GroupType>, path: string) {
    return getAbstractControl<Control, GroupType>(form, path);
}

export function getFormGroup<Control extends FormGroup, GroupType = unknown>(form: FormGroup<GroupType>, path: string) {
    return getAbstractControl<Control, GroupType>(form, path);
}
