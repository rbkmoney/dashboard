import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[dshTextColor]',
})
export class TextColorDirective {
    @Input() dshTextColor: 'primary' | 'secondary';

    @HostBinding('attr.class') get class(): string {
        const prefix = 'dsh-text-color';
        switch (this.dshTextColor) {
            case 'primary':
                return `${prefix}-primary`;
            case 'secondary':
                return `${prefix}-secondary`;
        }
    }
}
