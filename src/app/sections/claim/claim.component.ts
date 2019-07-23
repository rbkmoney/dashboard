import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';

import { ClaimService } from './claim.service';
import { ClaimsService } from '../../claims';
import { getClaimStatusViewInfo } from '../../view-utils';

@Component({
    selector: 'dsh-claim',
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.scss']
})
export class ClaimComponent {
    links = [
        {
            path: 'conversation',
            label: 'sections.claim.conversation.label'
        },
        {
            path: 'changes',
            label: 'sections.claim.changes.label'
        },
        {
            path: 'documents',
            label: 'sections.claim.documents.label'
        }
    ];

    claim$ = this.claimService.claim$.pipe(
        map(({ id, status }) => ({
            id,
            ...getClaimStatusViewInfo(status)
        })),
        shareReplay(1)
    );

    constructor(private claimService: ClaimService, public claimsService: ClaimsService, public router: Router) {}
}
