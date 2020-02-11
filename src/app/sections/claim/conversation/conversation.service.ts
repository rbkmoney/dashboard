import { Injectable } from '@angular/core';
import { map, shareReplay, pluck } from 'rxjs/operators';

import { toTimelineInfo } from './to-timeline-info';
import { ReceiveClaimService } from '../receive-claim.service';
import { ConversationID } from '../../../api-codegen/messages';
import { UpdateClaimService } from '../update-claim';

@Injectable()
export class ConversationService {
    timelineInfo$ = this.receiveClaimService.claim$.pipe(pluck('changeset'), map(toTimelineInfo), shareReplay(1));

    claimCreatedAt$ = this.receiveClaimService.claim$.pipe(pluck('createdAt'), shareReplay(1));

    constructor(private receiveClaimService: ReceiveClaimService, private updateClaimService: UpdateClaimService) {}

    commentSaved(id: ConversationID) {
        this.updateClaimService.updateByConversation(id);
    }
}
