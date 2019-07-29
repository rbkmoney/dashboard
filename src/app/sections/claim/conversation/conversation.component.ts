import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { toTimelineActionsInfo } from './to-timeline-actions-info';
import { ClaimService } from '../claim.service';

@Component({
    selector: 'dsh-conversation',
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss']
})
export class ConversationComponent {
    changesetViewInfo$ = this.claimService.getClaimByParams(this.route.params).pipe(
        map(({ changeset }) => toTimelineActionsInfo(changeset)),
        shareReplay(1)
    );

    constructor(private route: ActivatedRoute, private claimService: ClaimService) {}
}
