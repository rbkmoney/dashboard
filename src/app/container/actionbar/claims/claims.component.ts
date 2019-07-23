import { Component, Output, EventEmitter } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { ClaimsService } from '../../../claims';
import { getClaimStatusViewInfo } from '../../../view-utils';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss']
})
export class ClaimsComponent {
    @Output()
    action = new EventEmitter();

    claims$ = this.claimsService.getClaims(5).pipe(
        map(claims =>
            claims.map(({ status, id }) => ({
                id,
                ...getClaimStatusViewInfo(status)
            }))
        ),
        shareReplay(1)
    );

    constructor(public claimsService: ClaimsService) {}
}
