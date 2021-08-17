import { Directive, Injector, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';
import { ControlsValue } from '@ngneat/reactive-forms/lib/types';
import isEqual from 'lodash-es/isEqual';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { getFormValidationChanges } from './get-form-validation-changes';
import { getFormValueChanges } from './get-form-value-changes';
import { getValue } from './get-value';
import { WrappedAbstractControlSuperclass } from './wrapped-abstract-control-superclass';

@Directive()
export abstract class WrappedFormGroupSuperclass<
        // eslint-disable-next-line @typescript-eslint/ban-types
        OuterType extends object,
        // eslint-disable-next-line @typescript-eslint/ban-types
        InnerType extends object = OuterType
    >
    extends WrappedAbstractControlSuperclass<OuterType, InnerType>
    implements OnInit
{
    abstract formControl: FormGroup<InnerType>;
    emptyValue: ControlsValue<InnerType>;

    @Output() empty = new EventEmitter<boolean>();
    @Output() valid = new EventEmitter<boolean>();

    protected constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.emptyValue = getValue(this.formControl);
        this.subscribeTo(
            getFormValueChanges(this.formControl).pipe(
                map((value) => this.isEmpty(value)),
                distinctUntilChanged()
            ),
            (isEmpty) => this.empty.emit(isEmpty)
        );
        this.subscribeTo(getFormValidationChanges(this.formControl).pipe(distinctUntilChanged()), (isValid) =>
            this.valid.emit(isValid)
        );
    }

    protected isEmpty(currentValue: ControlsValue<InnerType>): boolean {
        return isEqual(currentValue, this.emptyValue);
    }
}
