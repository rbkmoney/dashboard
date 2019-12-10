import { Component, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../constants';

@Component({
    selector: 'dsh-claim-search',
    templateUrl: 'claim-search.component.html'
})
export class ClaimSearchComponent {

    statuses = [''];

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string
    ) {}

}
