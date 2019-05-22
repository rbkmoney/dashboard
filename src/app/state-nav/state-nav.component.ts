import { Component, ContentChildren, QueryList } from '@angular/core';

import { StateNavItemComponent } from './state-nav-item/state-nav-item.component';

@Component({
    selector: 'dsh-state-nav',
    templateUrl: 'state-nav.component.html',
    styleUrls: ['state-nav.component.scss']
})
export class StateNavComponent {
    @ContentChildren(StateNavItemComponent) items: QueryList<StateNavItemComponent>;

    constructor() {}
}
