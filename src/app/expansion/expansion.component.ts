import { Component, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../sections/constants';

@Component({
    selector: 'dsh-expansion',
    templateUrl: 'expansion.component.html',
    styleUrls: ['expansion.component.scss']
})
export class ExpansionComponent {
    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
