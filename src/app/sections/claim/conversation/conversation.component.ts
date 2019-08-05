import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { toTimelineInfo } from './to-timeline-info';
import { ClaimService } from '../claim.service';

@Component({
    selector: 'dsh-conversation',
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss']
})
export class ConversationComponent {
    claim$ = this.claimService.getClaimByParams(this.route.params);

    changesetViewInfo$ = this.claim$.pipe(
        map(({ changeset }) => toTimelineInfo(changeset)),
        shareReplay(1)
    );

    constructor(private route: ActivatedRoute, private claimService: ClaimService) {}
}
