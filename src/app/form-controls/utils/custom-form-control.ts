import { MatFormFieldControl } from '@angular/material';
import { DoCheck, ElementRef, HostBinding, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import uuid from 'uuid';

export class CustomFormControl implements MatFormFieldControl<any>, OnInit, OnDestroy, DoCheck, ControlValueAccessor {
    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @HostBinding('attr.aria-describedby') describedBy = '';

    formControl: FormControl;
    stateChanges = new Subject<void>();
    focused = false;
    ngControl = null;
    @HostBinding('id') id = `custom-form-control-${uuid()}`;
    @HostBinding('attr.aria-invalid') errorState = false;

    get empty() {
        return !this._value;
    }

    private _placeholder: string;
    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    private _required = false;
    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    private _disabled = false;
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.formControl.disable() : this.formControl.enable();
        this.stateChanges.next();
    }

    _value: any = '';
    get value(): any {
        return this.formControl.value;
    }
    set value(value) {
        this._value = value;
        this.formControl.setValue(this._value);
        this.onChange(value);
        this.stateChanges.next();
    }

    constructor(private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>, public injector: Injector) {
        this.formControl = new FormControl();
        fm.monitor(elRef, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }

    ngOnInit() {
        this.ngControl = this.injector.get(NgControl);
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef);
    }

    ngDoCheck(): void {
        if (this.ngControl) {
            this.errorState = this.ngControl.invalid; // Old: this.ngControl.invalid && this.ngControl.touched;
            this.stateChanges.next();
        }
    }

    setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            const input = this.elRef.nativeElement.querySelector('input');
            if (input) {
                input.focus();
            }
        }
    }

    // tslint:disable-next-line: no-empty
    onChange = (_value: any) => {};

    // tslint:disable-next-line: no-empty
    onTouched = () => {};

    writeValue(value: any): void {
        this.value = value;
        this.formControl.setValue(value);
    }

    registerOnChange(fn: (v: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}
