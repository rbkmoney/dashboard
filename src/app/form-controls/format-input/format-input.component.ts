import { Component, Input } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { TextMaskConfig } from 'angular2-text-mask';

import { configs, Type } from './configs';
import { CustomFormControl } from '../utils';

@Component({
    selector: 'dsh-format-input',
    templateUrl: 'format-input.component.html',
    styleUrls: ['format-input.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: FormatInputComponent }]
})
export class FormatInputComponent extends CustomFormControl {
    mask: TextMaskConfig;
    prefix = '';
    postfix = '';
    size: string = null;
    getValue: (v: any) => any;

    private _format: Type;
    @Input()
    set format(type: Type) {
        this._format = type;
        this.setType(type);
    }
    get format() {
        return this._format;
    }

    setType(type: Type) {
        const c = configs[type];
        const { placeholder, prefix, postfix, size, mask, getValue } = c;
        const sizeFromPlaceholder = c.sizeFromPlaceholder === undefined ? true : c.sizeFromPlaceholder;
        const estimatedSize = sizeFromPlaceholder && !size && placeholder ? placeholder.length : size;

        this.size = (prefix || postfix) && estimatedSize ? String(estimatedSize) : null;
        this.placeholder = this.prepareText(placeholder);
        this.prefix = this.prepareText(prefix);
        this.postfix = this.prepareText(postfix);
        this.mask = mask;
        if (getValue) {
            this.getValue = getValue;
        }
    }

    prepareText(str: string): string {
        return (typeof str === 'string' ? str.replace(/ /g, '\xa0') : str) || '';
    }
}
