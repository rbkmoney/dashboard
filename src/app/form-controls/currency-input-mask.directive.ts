import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[dshCurrencyMask]'
})
export class CurrencyMaskDirective {
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
        const curVal = value.replace(/\D/g, '');
        let newVal;
        const parts = [];
        for (let i = curVal.length - 2; i >= 0; i -= 3) {
            parts.push(curVal.slice(i - 3, i));
        }
        newVal = parts.join(' ') + ', ' + curVal.slice(curVal.length - 2, curVal.length);
        this.ngControl.valueAccessor.writeValue(newVal);
    }
}
