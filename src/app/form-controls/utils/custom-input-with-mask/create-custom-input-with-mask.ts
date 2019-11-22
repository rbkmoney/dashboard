import { Component, forwardRef, NgModule } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskConfig, TextMaskModule } from 'angular2-text-mask';
import { A11yModule } from '@angular/cdk/a11y';

import { CustomFormControl } from '../custom-form-control';

const BASE_CSS_CLASS = 'dsh-custom-input-with-mask';

function spacesToNbsp(str: string): string {
    return typeof str === 'string' ? str.replace(/ /g, '&nbsp;') : str;
}

function attrMapToStr(attrMap: any[][]): string {
    return attrMap
        .filter(([, v]) => v !== '')
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
}

export function createCustomInputWithMask({
    selector,
    mask,
    placeholder = '',
    sizeFromPlaceholder = true,
    size,
    prefix,
    postfix,
    styleUrls = []
}: {
    selector: string;
    mask: TextMaskConfig;
    placeholder?: string;
    sizeFromPlaceholder?: boolean;
    size?: number;
    prefix?: string;
    postfix?: string;
    styleUrls?: string[];
}) {
    if (sizeFromPlaceholder && !size && placeholder) {
        size = placeholder.length;
    }

    placeholder = spacesToNbsp(placeholder);
    prefix = spacesToNbsp(prefix);
    postfix = spacesToNbsp(postfix);

    const hasSize = (prefix || postfix) && size;
    const inputAttrs = [
        ['class', `${BASE_CSS_CLASS}-element${hasSize ? '' : ` ${BASE_CSS_CLASS}-element-full-size`}`],
        ['size', hasSize ? size : ''],
        ['placeholder', placeholder]
    ];

    @Component({
        selector,
        template: `
            ${prefix ? `<span class="${BASE_CSS_CLASS}-spacer">${prefix}</span>` : ''}
            <input
                ${attrMapToStr(inputAttrs)}
                [formControl]="formControl"
                (change)="writeValue($event.target.value)"
                [textMask]="mask"
            />
            ${postfix ? `<span class="${BASE_CSS_CLASS}-spacer">${postfix}</span>` : ''}
        `,
        styleUrls: ['./custom-input-with-mask.scss', ...styleUrls],
        providers: [
            { provide: MatFormFieldControl, useExisting: InputComponent },
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => InputComponent),
                multi: true
            }
        ]
    })
    class InputComponent extends CustomFormControl {
        readonly mask = mask;
    }

    @NgModule({
        imports: [FormsModule, ReactiveFormsModule, A11yModule, TextMaskModule],
        entryComponents: [InputComponent],
        declarations: [InputComponent],
        exports: [InputComponent]
    })
    class InputModule {}

    return { InputComponent, InputModule };
}
