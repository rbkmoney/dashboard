import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MobileCommerceDetails } from '../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-mobile-commerce',
    templateUrl: 'mobile-commerce.component.html',

    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileCommerceComponent {
    @Input() details: MobileCommerceDetails;
}
