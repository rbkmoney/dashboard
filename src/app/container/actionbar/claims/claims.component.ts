import { Component, Input } from '@angular/core';

import { ClaimsService } from '../../../claims';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss']
})
export class ClaimsComponent {
    @Input()
    closeDropdown: () => void;

    claims$ = this.claimsService.getClaims(5, 5000);

    constructor(public claimsService: ClaimsService) {}

    actionHandler({ isMoving }) {
        if (isMoving) {
            this.closeDropdown();
        }
    }
}
