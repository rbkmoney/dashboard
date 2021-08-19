import { Directive, Injector, OnInit } from '@angular/core';
import { ValidationErrors, Validator } from '@angular/forms';

import { WrappedAbstractControlSuperclass } from './wrapped-abstract-control-superclass';

@Directive()
export abstract class ValidatedWrappedAbstractControlSuperclass<OuterType, InnerType = OuterType>
    extends WrappedAbstractControlSuperclass<OuterType, InnerType>
    implements OnInit, Validator
{
    protected emptyValue: InnerType;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.emptyValue = this.formControl.value as InnerType;
        super.ngOnInit();
    }

    validate(): ValidationErrors | null {
        return this.formControl.invalid ? { invalid: true } : null;
    }

    protected outerToInner(outer: OuterType): InnerType {
        if (typeof this.emptyValue === 'object' && !outer) return this.emptyValue;
        return outer as unknown as InnerType;
    }
}
