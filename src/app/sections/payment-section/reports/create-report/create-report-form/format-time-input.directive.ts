import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][dshFormatTimeInput]',
})
export class FormatTimeInputDirective {
    constructor(public ngControl: NgControl) {}

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event, false);
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event) {
        this.onInputChange(event.target.value, true);
    }

    onInputChange(event, backspace) {
        let newValue = event;
        if (backspace) {
            if (/.*:\d$/.test(newValue) || /.*\d:$/.test(newValue)) {
                newValue = newValue.substring(0, newValue.length - 1);
            }
        } else {
            if (/.*\d\d$/.test(newValue) && newValue.length < 8) {
                newValue = newValue + ':';
            }
        }
        this.ngControl.valueAccessor.writeValue(newValue);
    }
}
