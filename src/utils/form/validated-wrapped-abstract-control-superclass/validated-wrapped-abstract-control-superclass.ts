import { Injector, OnInit } from '@angular/core';
import { ValidationErrors, Validator } from '@angular/forms';

import { WrappedAbstractControlSuperclass } from './wrapped-abstract-control-superclass';

export abstract class ValidatedWrappedAbstractControlSuperclass<OuterType, InnerType = OuterType>
    extends WrappedAbstractControlSuperclass<OuterType, InnerType>
    implements OnInit, Validator
{
    protected constructor(injector: Injector) {
        super(injector);
    }

    validate(): ValidationErrors | null {
        return this.formControl.invalid ? { invalid: true } : null;
    }
}
