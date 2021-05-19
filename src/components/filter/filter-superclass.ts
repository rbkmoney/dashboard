import { Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlSuperclass } from '@s-libs/ng-core';
import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';
import { BehaviorSubject, defer } from 'rxjs';

export abstract class FilterSuperclass<T> extends FormControlSuperclass<T> {
    readonly formControl = new FormControl();
    readonly value$ = defer(() => this._value$.asObservable());

    get value(): T {
        return this._value$.value;
    }
    set value(value: T) {
        this.setValue(value);
    }

    private _value$ = new BehaviorSubject<T>(this.empty);

    protected constructor(injector: Injector, public empty: T = null) {
        super(injector);
    }

    handleIncomingValue(value: T): void {
        this.setValue(value, false);
        this.formControl.setValue(this.value);
    }

    save(): void {
        this.setValue(this.formControl.value);
    }

    clear(): void {
        this.formControl.setValue(this.empty);
    }

    isEqual(oldValue: T, newValue: T): boolean {
        return isEqual(oldValue, newValue);
    }

    isEmpty(value: T): boolean {
        return isEmpty(value);
    }

    private setValue(value: T, isEmit: boolean = true) {
        value = this.isEmpty(value) ? this.empty : value;
        if (!this.isEqual(value, this.value)) {
            this._value$.next(value);
            if (isEmit) {
                this.emitOutgoingValue(value);
            }
        }
    }
}
