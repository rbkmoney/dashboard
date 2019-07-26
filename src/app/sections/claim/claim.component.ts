import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { ClaimService } from './claim.service';
import { getClaimStatusViewInfo } from '../../view-utils';
import { StatusModificationUnit } from '../../api/claim-management';

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
            ...getClaimStatusViewInfo(status as StatusModificationUnit.StatusEnum)
        })),
        shareReplay(1)
    );

    constructor(private claimService: ClaimService) {}
}
