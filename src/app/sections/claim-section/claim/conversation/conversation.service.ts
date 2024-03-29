import { Injectable } from '@angular/core';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { FileModification } from '@dsh/api-codegen/claim-management';
import { Conversation } from '@dsh/api-codegen/messages';

import { ReceiveClaimService } from '../receive-claim.service';
import { UpdateClaimService } from '../update-claim';
import { toTimelineInfo } from './to-timeline-info';

@Injectable()
export class ConversationService {
    timelineInfo$ = this.receiveClaimService.claim$.pipe(pluck('changeset'), map(toTimelineInfo), shareReplay(1));
    claimCreatedAt$ = this.receiveClaimService.claim$.pipe(pluck('createdAt'), shareReplay(1));

    constructor(private receiveClaimService: ReceiveClaimService, private updateClaimService: UpdateClaimService) {}

    commentSaved(id: Conversation['conversationId']) {
        this.updateClaimService.updateByConversation(id);
    }

    deleteFile(id: string) {
        this.updateClaimService.updateByFiles([id], FileModification.FileModificationTypeEnum.FileDeleted);
    }
}
