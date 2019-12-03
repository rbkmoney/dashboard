import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { toTimelineInfo } from './to-timeline-info';
import { ReceiveClaimService } from '../receive-claim.service';

@Injectable()
export class ConversationService {
    timelineInfo$ = this.claimService.claim$.pipe(
        map(({ changeset }) => toTimelineInfo(changeset)),
        shareReplay(1)
    );

    constructor(private claimService: ReceiveClaimService) {}
}
