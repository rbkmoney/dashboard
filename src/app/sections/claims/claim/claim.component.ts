import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ClaimService } from './claim.service';
import { ViewClaim, ClaimsService } from '../../../claims';

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

    get claim$(): Observable<ViewClaim> {
        return this.claimService.claim$;
    }

    constructor(private claimService: ClaimService, public claimsService: ClaimsService, public router: Router) {}
}
