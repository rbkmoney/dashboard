import { Component } from '@angular/core';

import { ConversationService } from './conversation.service';
import { QuestionaryDocumentService } from '../questionary-document';

@Component({
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss'],
    providers: [ConversationService]
})
export class ConversationComponent {
    timelineInfo$ = this.conversationService.timelineInfo$;
    claimCreatedAt$ = this.conversationService.claimCreatedAt$;

    constructor(
        private conversationService: ConversationService,
        private questionaryDocumentService: QuestionaryDocumentService
    ) {}

    downloadDocument() {
        this.questionaryDocumentService.createDoc('1').subscribe(doc => doc.download('russian-individual-entity'));
    }

    downloadBeneficialOwnerDocument() {
        this.questionaryDocumentService
            .createBeneficialOwnerDocs('1')
            .subscribe(docs => docs.forEach(doc => doc.download('beneficial-owner')));
    }
}
