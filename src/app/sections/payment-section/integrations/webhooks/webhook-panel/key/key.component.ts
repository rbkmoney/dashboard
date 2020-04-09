import { Component, Inject, Input } from '@angular/core';

import { LAYOUT_GAP } from '../../../../../constants';

@Component({
    selector: 'dsh-key',
    templateUrl: 'key.component.html',
    styleUrls: ['key.component.scss']
})
export class KeyComponent {
    @Input()
    key: string;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
