import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { coerceBoolean } from '@dsh/utils';

import { BrandName } from './brand-name';

interface IconConfig {
    name: string;
    width: string;
}

@Component({
    selector: 'dsh-brand',
    templateUrl: 'brand.component.html',
    styleUrls: ['./brand.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent {
    @Input() name: BrandName;
    @Input() @coerceBoolean inverted = false;
    @Input() navigationLink = '/';

    get iconConfig(): IconConfig | null {
        switch (this.name) {
            case BrandName.VrbCube:
                return {
                    name: 'logo_vrbcube_black',
                    width: '147px',
                };
            case BrandName.RbkMoney:
                return {
                    name: this.inverted ? 'logo_rbkmoney_white' : 'logo_rbkmoney_black',
                    width: '96px',
                };
            case BrandName.Xpay:
                return {
                    name: 'logo_xpay_black',
                    width: '168px',
                };
            default:
                return null;
        }
    }
}
