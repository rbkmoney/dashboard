import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LAYOUT_GAP } from '../../../../../constants';

@Component({
    selector: 'dsh-individual-residency-info',
    templateUrl: 'individual-residency-info.component.html',
})
export class IndividualResidencyInfoComponent {
    @Input() form: FormGroup;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
