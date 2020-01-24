import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ConversationService } from './conversation.service';
import { Modification } from '../../../api-codegen/claim-management';
import {
    isClaimModification,
    isDocumentModificationUnit,
    isCommentModificationUnit,
    isFileModificationUnit
} from '../../../api';
import { ConversationID } from '../../../api-codegen/messages';

@Component({
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss'],
    providers: [ConversationService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent {
    timelineInfo$ = this.conversationService.timelineInfo$;
    claimCreatedAt$ = this.conversationService.claimCreatedAt$;

    constructor(private conversationService: ConversationService) {}

    isDocumentModificationUnit(m: Modification): boolean {
        return isClaimModification(m) && isDocumentModificationUnit(m.claimModificationType);
    }

    isCommentModificationUnit(m: Modification): boolean {
        return isClaimModification(m) && isCommentModificationUnit(m.claimModificationType);
    }

    isFileModificationUnit(m: Modification): boolean {
        return isClaimModification(m) && isFileModificationUnit(m.claimModificationType);
    }

    commentSaved(id: ConversationID) {
        this.conversationService.commentSaved(id);
    }
}
