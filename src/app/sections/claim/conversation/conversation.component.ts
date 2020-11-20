import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
    isClaimModification,
    isCommentModificationUnit,
    isDocumentModificationUnit,
    isFileModificationUnit,
    SpecificClaimModificationUnit,
} from '../../../api';
import { FileModificationUnit, Modification } from '../../../api-codegen/claim-management';
import { Conversation } from '../../../api-codegen/messages';
import { ConversationService } from './conversation.service';
import { EditDocumentService } from './edit-document.service';
import { TimelineItemInfo } from './to-timeline-info';

@Component({
    selector: 'dsh-conversation',
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss'],
    providers: [ConversationService, EditDocumentService],
    changeDetection: ChangeDetectionStrategy.OnPush,
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

    commentSaved(id: Conversation['conversationId']) {
        this.conversationService.commentSaved(id);
    }

    editDocument(info: TimelineItemInfo) {
        this.editDocumentService.goToOnboarding(info);
    }

    simpleTrackBy(index: number): number {
        return index;
    }

    deleteFile(m: SpecificClaimModificationUnit<FileModificationUnit>) {
        this.conversationService.deleteFile(m.claimModificationType.fileId);
    }
}
