import { Component, Inject, Input } from '@angular/core';

import { RecurrentPayer } from '@dsh/api-codegen/capi/swagger-codegen';

import { LAYOUT_GAP } from '../../tokens';

@Component({
    selector: 'dsh-recurrent-details',
    templateUrl: 'recurrent-details.component.html',
})
export class RecurrentDetailsComponent {
    @Input() recurrentPayer: RecurrentPayer;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
