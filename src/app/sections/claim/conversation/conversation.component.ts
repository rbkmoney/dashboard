import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ClaimService } from '../claim.service';
import { Claim } from '../../../api/claim-management';
import { toTimelineActionsInfo } from './to-timeline-actions-info';

@Component({
    selector: 'dsh-conversation',
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss']
})
export class ConversationComponent {
    get claim$(): Observable<Claim> {
        return this.claimService.claim$;
    }

    changesetViewInfo$ = this.claimService.claim$.pipe(
        map(({ changeset }) => toTimelineActionsInfo(changeset)),
        shareReplay(1)
    );

    constructor(private claimService: ClaimService) {}
}
