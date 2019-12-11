import { Injectable } from '@angular/core';
import { map, shareReplay, pluck } from 'rxjs/operators';

import { toTimelineInfo } from './to-timeline-info';
import { ReceiveClaimService } from '../receive-claim.service';
import { ConversationID } from '../../../api-codegen/messages';
import { UpdateClaimService } from '../update-claim.service';

@Injectable()
export class ConversationService {
    timelineInfo$ = this.claimService.claim$.pipe(
        pluck('changeset'),
        map(toTimelineInfo),
        shareReplay(1)
    );

    claimCreatedAt$ = this.claimService.claim$.pipe(
        pluck('createdAt'),
        shareReplay(1)
    );

    constructor(private claimService: ReceiveClaimService, private updateClaimService: UpdateClaimService) {}

    commentSaved(id: ConversationID) {
        this.updateClaimService.updateByConversation(id);
    }
}
