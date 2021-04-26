import { Directive, HostBinding, Input } from '@angular/core';

import { Color } from '@dsh/components/indicators/text-color/types/color';

const PREFIX = 'dsh-text-color';

@Directive({
    selector: '[dshTextColor]',
})
export class TextColorDirective {
    @Input() dshTextColor: keyof Color | Color;

    @HostBinding(`class.${PREFIX}-${Color.Primary}`) get primaryColor() {
        return this.dshTextColor === Color.Primary;
    }

    @HostBinding(`class.${PREFIX}-${Color.Secondary}`) get secondaryColor() {
        return this.dshTextColor === Color.Secondary;
    }
}
