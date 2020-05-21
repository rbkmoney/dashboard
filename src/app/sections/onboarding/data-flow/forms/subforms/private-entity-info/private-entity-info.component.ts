import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LAYOUT_GAP } from '../../../../../constants';

@Component({
    selector: 'dsh-private-entity-info',
    templateUrl: 'private-entity-info.component.html',
})
export class PrivateEntityInfoComponent {
    @Input() form: FormGroup;
    @Input() additionalFields: string[] = [];

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}

    isAdditionalFieldActive(field: string) {
        return this.additionalFields.includes(field);
    }
}
