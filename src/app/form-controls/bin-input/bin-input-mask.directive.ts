import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[dshBinMask]'
})
export class BINMaskDirective {
    constructor(public ngControl: NgControl) {}

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event: string) {
        this.onInputChange(event, false);
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event) {
        this.onInputChange(event.target.value, true);
    }

    onInputChange(value: string, backspace: boolean) {
        value = value.replace(/\D/g, '');
        let newVal;
        const parts = [];
        for (let i = 0; i < value.length; i += 4) {
            parts.push(value.slice(i, i + 4));
        }
        newVal = parts.join(' ');
        this.ngControl.valueAccessor.writeValue(newVal);
    }
}
