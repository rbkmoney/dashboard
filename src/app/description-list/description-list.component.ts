import { Component, Inject } from '@angular/core';

import { LAYOUT_GAP } from '../sections/constants';

@Component({
    selector: 'dsh-dl',
    templateUrl: 'description-list.component.html'
    // providers: [{ provide: LAYOUT_GAP, useValue: '20px' }]
})
export class DescriptionListComponent {
    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
