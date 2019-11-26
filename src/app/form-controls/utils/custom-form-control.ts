import { FocusMonitor } from '@angular/cdk/a11y';
import { MatFormFieldControl, ErrorStateMatcher, MatAutocompleteOrigin } from '@angular/material';
import { ControlValueAccessor, FormControl, NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    DoCheck,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    AfterViewInit,
    Optional,
    Self,
    HostListener
} from '@angular/core';
import uuid from 'uuid';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { takeUntil } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';

import { InputMixinBase } from './input-base';

export class CustomFormControl extends InputMixinBase
    implements AfterViewInit, ControlValueAccessor, MatFormFieldControl<string>, OnDestroy, OnInit, DoCheck {
    protected _uid = `custom-input-${uuid()}`;
    protected _previousNativeValue: any;
    /** The aria-describedby attribute on the input for improved a11y. */
    @HostBinding('attr.aria-describedby') _ariaDescribedby: string;

    /** Whether the component is being rendered on the server. */
    _isServer = !this._platform.isBrowser;

    readonly stateChanges: Subject<void> = new Subject<void>();

    controlType = 'text';

    autofilled = false;

    @Input()
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);

        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }
    protected _disabled = false;

    @HostBinding('attr.id')
    @Input()
    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value || this._uid;
    }
    protected _id: string;

    @Input()
    placeholder: string;

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }
    protected _required = false;

    protected type = 'text';

    @Input()
    get value(): string {
        return this.formControl.value;
    }
    set value(value: string) {
        this.formControl.setValue(value);
        this.stateChanges.next();
    }

    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    get inputElement(): HTMLInputElement {
        return this.elementRef.nativeElement.querySelector('input');
    }

    get empty(): boolean {
        return !this.formControl.value;
    }

    get focused(): boolean {
        return this._focused;
    }
    set focused(value: boolean) {
        this._focused = value;
        this.stateChanges.next();
    }

    formControl = new FormControl();
    autocompleteOrigin: MatAutocompleteOrigin;

    private _focused = false;
    private destroy: Subject<void> = new Subject();
    private autofillSub = Subscription.EMPTY;
    private _onTouched: () => void;

    constructor(
        private focusMonitor: FocusMonitor,
        private elementRef: ElementRef<HTMLElement>,
        protected _platform: Platform,
        @Optional() @Self() public ngControl: NgControl,
        private autofillMonitor: AutofillMonitor,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() parentForm: NgForm,
        @Optional() parentFormGroup: FormGroupDirective
    ) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        if (this.ngControl !== null) {
            // Set the value accessor directly
            // (instead of providing NG_VALUE_ACCESSOR)
            // to avoid running into a circular import
            this.ngControl.valueAccessor = this;
        }
    }

    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    ngOnInit() {
        this.updateAutocompleteOrigin();
    }

    ngAfterViewInit(): void {
        this.focusMonitor.monitor(this.elementRef.nativeElement, true).subscribe(focusOrigin => {
            this.focused = !!focusOrigin;
        });
    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
        this.stateChanges.complete();
        this.autofillSub.unsubscribe();
        this.focusMonitor.stopMonitoring(this.elementRef.nativeElement);
        this.autofillMonitor.stopMonitoring(this.inputElement);
    }

    onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.focusMonitor.focusVia(this.inputElement, 'mouse');
        }
    }

    @HostListener('focusout')
    onTouched(): void {
        this._onTouched();
    }

    updateAutocompleteOrigin() {
        this.autocompleteOrigin = {
            elementRef: new ElementRef(this.elementRef.nativeElement.parentElement.parentElement)
        };
    }

    registerOnChange(onChange: (value: string) => void): void {
        this.formControl.valueChanges.pipe(takeUntil(this.destroy)).subscribe(onChange);
    }

    registerOnTouched(onTouched: () => void): void {
        this._onTouched = onTouched;
    }

    setDescribedByIds(ids: string[]): void {
        this._ariaDescribedby = ids.join(' ');
    }

    setDisabledState(shouldDisable: boolean): void {
        if (shouldDisable) {
            this.formControl.disable();
        } else {
            this.formControl.enable();
        }

        this.disabled = shouldDisable;
    }

    writeValue(value: string): void {
        this.formControl.setValue(value, { emitEvent: false });
    }
}
