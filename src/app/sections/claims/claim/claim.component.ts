import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ClaimService } from './claim.service';
import { ViewClaim } from '../../../claims';

@Component({
    selector: 'dsh-claim',
    providers: [ClaimService],
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.scss']
})
export class ClaimComponent {
    links = [
        {
            path: '',
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

    get claim$(): Observable<ViewClaim> {
        return this.claimService.claim$;
    }

    constructor(private claimService: ClaimService) {}
}
