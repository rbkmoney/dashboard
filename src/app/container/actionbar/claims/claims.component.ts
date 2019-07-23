import { Component, Output, EventEmitter } from '@angular/core';

import { ClaimsService } from '../../../claims';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss']
})
export class ClaimsComponent {
    @Output()
    action = new EventEmitter();

    claims$ = this.claimsService.getClaims(5);

    constructor(public claimsService: ClaimsService) {}
}
