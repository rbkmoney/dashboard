import { Component, Input, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../../../../../constants';

@Component({
    selector: 'dsh-individual-residency-info',
    templateUrl: 'individual-residency-info.component.html'
})
export class IndividualResidencyInfoComponent {
    @Input() form;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
