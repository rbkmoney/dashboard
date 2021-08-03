import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'dsh-private-entity-info',
    templateUrl: 'private-entity-info.component.html',
})
export class PrivateEntityInfoComponent {
    @Input() form: FormGroup;
    @Input() additionalFields: string[] = [];

    isAdditionalFieldActive(field: string) {
        return this.additionalFields.includes(field);
    }
}
