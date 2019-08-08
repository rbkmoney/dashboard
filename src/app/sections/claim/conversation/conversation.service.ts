import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { toTimelineInfo } from './to-timeline-info';
import { ClaimService } from '../claim.service';

@Injectable()
export class ConversationService {
    claim$ = this.claimService.getClaimByParams(this.route.params);

    timelineInfo$ = this.claim$.pipe(
        map(({ changeset }) => toTimelineInfo(changeset)),
        shareReplay(1)
    );

    constructor(private route: ActivatedRoute, private claimService: ClaimService) {}
}
