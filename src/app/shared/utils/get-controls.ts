import { AbstractControl, FormArray, FormGroup } from '@ngneat/reactive-forms';
import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';

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

export function getTypedFormArray<T extends any[]>(control: AbstractControl<T>): FormArray<T[number]> {
    return control as any;
}

export function getTypedFormGroup<T>(control: AbstractControl<T>): FormGroup<T> {
    return control as any;
}
