import { Component, Inject, Input } from '@angular/core';

import { LAYOUT_GAP } from '../../../../constants';

@Component({
    selector: 'dsh-events',
    templateUrl: 'events.component.html',
    styleUrls: ['events.component.scss']
})
export class EventsComponent {
    @Input()
    events: string[];

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {}
}
