import { Component, Inject, Input } from '@angular/core';

import { Webhook } from '../../../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../../../constants';

@Component({
    selector: 'dsh-details',
    templateUrl: 'details.component.html',
})
export class DetailsComponent {
    @Input()
    webhook: Webhook;

    @Input()
    shopName: string;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
