import { Component, Output, EventEmitter } from '@angular/core';

import { ClaimsService } from './claims.service';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss'],
    providers: [ClaimsService]
})
export class ClaimsComponent {
    @Output() menuItemSelected = new EventEmitter();

    dicBasePath = 'actionbar.claims';

    constructor(public claimsService: ClaimsService) {}
}
