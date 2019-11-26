import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { TextMaskConfig } from 'angular2-text-mask';

import { configs, Type } from './configs';
import { CustomFormControl } from '../utils';

@Component({
    selector: 'dsh-format-input',
    templateUrl: 'format-input.component.html',
    styleUrls: ['format-input.component.scss'],
    providers: [
        { provide: MatFormFieldControl, useExisting: FormatInputComponent },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormatInputComponent),
            multi: true
        }
    ]
})
export class FormatInputComponent extends CustomFormControl {
    mask: TextMaskConfig;
    placeholder = '';
    prefix = '';
    postfix = '';
    size: string = null;

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
        const { placeholder, prefix, postfix, size, mask } = c;
        const sizeFromPlaceholder = c.sizeFromPlaceholder === undefined ? true : c.sizeFromPlaceholder;
        const estimatedSize = sizeFromPlaceholder && !size && placeholder ? placeholder.length : size;

        this.size = (prefix || postfix) && estimatedSize ? String(estimatedSize) : null;
        this.placeholder = this.prepareText(placeholder);
        this.prefix = this.prepareText(prefix);
        this.postfix = this.prepareText(postfix);
        this.mask = mask;
    }

    prepareText(str: string): string {
        return (typeof str === 'string' ? str.replace(/ /g, '\xa0') : str) || '';
    }
}
