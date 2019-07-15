import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ViewClaim } from '../../../../claims';
import { ClaimService } from '../claim.service';

@Component({
    selector: 'dsh-conversation',
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss']
})
export class ConversationComponent {
    get claim$(): Observable<ViewClaim> {
        return this.claimService.claim$;
    }

    constructor(private claimService: ClaimService) {}
}
