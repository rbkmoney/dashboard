import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

import { cardMask } from './card-input-mask';

@Component({
    selector: 'dsh-card-input',
    templateUrl: 'card-input.component.html',
    styleUrls: ['card-input.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: CardInputComponent }]
})
export class CardInputComponent implements MatFormFieldControl<number>, OnDestroy {
    static nextId = 0;

    @HostBinding('class.floating')
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @HostBinding('id')
    id = `dsh-card-input-${CardInputComponent.nextId++}`;

    @HostBinding('attr.aria-describedby')
    describedBy = '';

    formControl: FormControl;
    stateChanges = new Subject<void>();
    focused = false;
    ngControl = null;
    errorState = false;
    controlType = 'dsh-card-input';

    get empty() {
        return !this.formControl.value;
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    private _placeholder: string;

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _required = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.formControl.disable() : this.formControl.enable();
        this.stateChanges.next();
    }
    private _disabled = false;

    @Input()
    get value(): number {
        return this.formControl.value.replace(/\D/g, '');
    }
    set value(v: number) {
        this.formControl.setValue(v);
        this.stateChanges.next();
    }

    get mask() {
        return cardMask;
    }

    constructor(private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
        this.formControl = new FormControl();
        fm.monitor(elRef, true).subscribe(origin => {
            this.focused = !!origin;
            this.stateChanges.next();
        });
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef);
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
}
