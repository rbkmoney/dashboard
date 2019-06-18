import { Component, Input } from '@angular/core';

import { BrandType } from './brand-type';

@Component({
    selector: 'dsh-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss']
})
export class BrandComponent {
    @Input() type: BrandType = BrandType.normal;
    @Input() navigationLink = '/';

    get iconName(): string {
        switch (this.type) {
            case BrandType.invert:
                return 'logo_white';
            case BrandType.normal:
                return 'logo';
            default:
                throw new Error(`Unknown brand type: ${this.type}`);
        }
    }
}
