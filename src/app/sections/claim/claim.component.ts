import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { ClaimService } from './claim.service';

@Component({
    selector: 'dsh-claim',
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.scss'],
    providers: [ClaimService]
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

    claimID$ = this.claimService.claim$.pipe(map(({ id }) => id));
    claimStatusViewInfo$ = this.claimService.claimStatusViewInfo$;

    constructor(private claimService: ClaimService) {}
}
