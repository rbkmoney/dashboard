import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
    isClaimModification,
    isCommentModificationUnit,
    isDocumentModificationUnit,
    isFileModificationUnit
} from '../../../api';
import { Modification } from '../../../api-codegen/claim-management';
import { ConversationID } from '../../../api-codegen/messages';
import { ConversationService } from './conversation.service';
import { EditDocumentService } from './edit-document.service';
import { TimelineItemInfo } from './to-timeline-info';

@Component({
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss'],
    providers: [ConversationService, EditDocumentService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent {
    timelineInfo$ = this.conversationService.timelineInfo$;
    claimCreatedAt$ = this.conversationService.claimCreatedAt$;

    expandAll = false;

    constructor(private conversationService: ConversationService, private editDocumentService: EditDocumentService) {}

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

    editDocument(info: TimelineItemInfo) {
        this.editDocumentService.goToOnboarding(info);
    }

    simpleTrackBy(index: number): number {
        return index;
    }
}
