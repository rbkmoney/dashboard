import { Component } from '@angular/core';

import { ConversationService } from './conversation.service';
import { Modification } from '../../../api-codegen/claim-management';
import { isClaimModification, isDocumentModificationUnit } from '../../../api';

@Component({
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss'],
    providers: [ConversationService]
})
export class ConversationComponent {
    timelineInfo$ = this.conversationService.timelineInfo$;
    claimCreatedAt$ = this.conversationService.claimCreatedAt$;

    constructor(private conversationService: ConversationService) {}

    isDocumentModificationUnit(m: Modification): boolean {
        return isClaimModification(m) && isDocumentModificationUnit(m.claimModificationType);
    }
}
