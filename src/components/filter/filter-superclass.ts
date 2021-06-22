import { Injector } from '@angular/core';
import { AbstractControl, FormControl } from '@ngneat/reactive-forms';
import { FormControlSuperclass } from '@s-libs/ng-core';
import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';
import { BehaviorSubject, defer } from 'rxjs';

export abstract class FilterSuperclass<T> extends FormControlSuperclass<T> {
    readonly formControl: AbstractControl<T> = new FormControl<T>();
    readonly savedValue$ = defer(() => this._value$.asObservable());

    get savedValue(): T {
        return this._value$.value;
    }
    set savedValue(value: T) {
        this.setValue(value);
    }

    get isActive(): boolean {
        return !this.isEmpty(this.savedValue);
    }

    private _value$ = new BehaviorSubject<T>(this.createEmpty());

    protected constructor(injector: Injector) {
        super(injector);
    }

    handleIncomingValue(value: T): void {
        this.setValue(value, false);
        this.formControl.setValue(this.savedValue);
    }

    save(): void {
        this.savedValue = this.formControl.value;
    }

    clear(): void {
        this.formControl.setValue(this.createEmpty());
    }

    isEqual(oldValue: T, newValue: T): boolean {
        return isEqual(oldValue, newValue);
    }

    isEmpty(value: T): boolean {
        return this.isEqual(value, this.createEmpty()) || isEmpty(value);
    }

    createEmpty(): T {
        return null;
    }

    private setValue(value: T, isEmit: boolean = true) {
        value = this.isEmpty(value) ? this.createEmpty() : value;
        if (!this.isEqual(value, this.savedValue)) {
            this._value$.next(value);
            if (isEmit) {
                this.emitOutgoingValue(value);
            }
        }
    }
}
