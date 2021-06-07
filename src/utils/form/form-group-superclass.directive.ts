import { Directive, Injector, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@ngneat/reactive-forms';
import { ControlsValue } from '@ngneat/reactive-forms/lib/types';
import { wrapMethod } from '@s-libs/js-core';
import { FormControlSuperclass } from '@s-libs/ng-core';
import isEqual from 'lodash-es/isEqual';
import { merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { getFormValidationChanges } from './get-form-validation-changes';
import { getFormValueChanges } from './get-form-value-changes';
import { getValue } from './get-value';

@Directive()
export abstract class FormGroupSuperclass<
        // eslint-disable-next-line @typescript-eslint/ban-types
        InnerType extends object,
        // eslint-disable-next-line @typescript-eslint/ban-types
        OuterType extends object = InnerType
    >
    extends FormControlSuperclass<OuterType>
    implements OnInit {
    abstract formControl: FormGroup<InnerType>;
    emptyValue: ControlsValue<InnerType>;

    @Output() empty = new EventEmitter<boolean>();
    @Output() valid = new EventEmitter<boolean>();

    private incomingValues$ = new Subject<OuterType>();
    private incomingValuesChanged$ = new Subject<ControlsValue<InnerType>>();

    protected constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.emptyValue = getValue(this.formControl);
        this.subscribeTo(this.setUpOuterToInner$(this.incomingValues$), (inner) => {
            this.formControl.setValue(inner, { emitEvent: false });
            this.incomingValuesChanged$.next(inner);
        });
        this.subscribeTo(this.setUpInnerToOuter$(this.formControl.valueChanges), (outer) => {
            this.emitOutgoingValue(outer);
        });
        wrapMethod(this.formControl, 'markAsTouched', {
            after: () => {
                this.onTouched();
            },
        });
        this.subscribeTo(
            merge(getFormValueChanges(this.formControl), this.incomingValuesChanged$).pipe(
                map((value) => this.isEmpty(value)),
                distinctUntilChanged()
            ),
            (isEmpty) => {
                this.empty.emit(isEmpty);
            }
        );
        this.subscribeTo(
            merge(
                getFormValidationChanges(this.formControl),
                this.incomingValuesChanged$.pipe(map(() => this.formControl.valid))
            ).pipe(distinctUntilChanged()),
            (isValid) => {
                this.valid.emit(isValid);
            }
        );
    }

    handleIncomingValue(outer: OuterType): void {
        this.incomingValues$.next(outer);
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.formControl.disable({ emitEvent: false });
        } else {
            this.formControl.enable({ emitEvent: false });
        }
        super.setDisabledState(this.isDisabled);
    }

    protected outerToInner(outer: OuterType): ControlsValue<InnerType> {
        return (outer || this.emptyValue) as ControlsValue<InnerType>;
    }

    protected setUpOuterToInner$(outer$: Observable<OuterType>): Observable<ControlsValue<InnerType>> {
        return outer$.pipe(map((outer) => this.outerToInner(outer)));
    }

    protected innerToOuter(inner: ControlsValue<InnerType>): OuterType {
        return inner as OuterType;
    }

    protected setUpInnerToOuter$(inner$: Observable<ControlsValue<InnerType>>): Observable<OuterType> {
        return inner$.pipe(map((inner) => this.innerToOuter(inner)));
    }

    protected isEmpty(currentValue: ControlsValue<InnerType>): boolean {
        return isEqual(currentValue, this.emptyValue);
    }
}
