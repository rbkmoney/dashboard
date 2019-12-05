import { Component, Input, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../../../../../constants';

@Component({
    selector: 'dsh-private-entity-info',
    templateUrl: 'private-entity-info.component.html'
})
export class PrivateEntityInfoComponent {
    @Input() form;

    @Input()
    additionalFields = [];

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    isAdditionalFieldActive(field: string) {
        return this.additionalFields.includes(field);
    }
}
