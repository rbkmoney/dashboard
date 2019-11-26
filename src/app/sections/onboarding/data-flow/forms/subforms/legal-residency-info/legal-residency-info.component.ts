import { Component, Input, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../../../../../constants';

@Component({
    selector: 'dsh-legal-residency-info',
    templateUrl: 'legal-residency-info.component.html'
})
export class LegalResidencyInfoComponent {
    @Input() form;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
