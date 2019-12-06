import { Component } from '@angular/core';
import { shareReplay, pluck, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ConversationService } from './conversation.service';
import { QuestionaryDocumentService } from '../questionary-document';
import { takeDocumentModificationUnit, QuestionaryService } from '../../../api';
import { ReceiveClaimService } from '../receive-claim.service';
import { Questionary } from '../../../api-codegen/questionary';

@Component({
    templateUrl: 'conversation.component.html',
    styleUrls: ['conversation.component.scss'],
    providers: [ConversationService]
})
export class ConversationComponent {
    timelineInfo$ = this.conversationService.timelineInfo$;
    claimCreatedAt$ = this.conversationService.claimCreatedAt$;
    questionary$: Observable<Questionary> = this.claimService.claim$.pipe(
        takeDocumentModificationUnit,
        switchMap(({ documentId }) => this.questionaryService.getQuestionary(documentId)),
        pluck('questionary'),
        shareReplay(1)
    );
    document$ = this.questionary$.pipe(
        switchMap(questionary => this.questionaryDocumentService.createDoc(questionary)),
        shareReplay(1)
    );
    beneficialOwnersDocuments$ = this.questionary$.pipe(
        switchMap(questionary => this.questionaryDocumentService.createBeneficialOwnerDocs(questionary)),
        shareReplay(1)
    );

    constructor(
        private conversationService: ConversationService,
        private questionaryDocumentService: QuestionaryDocumentService,
        private claimService: ReceiveClaimService,
        private questionaryService: QuestionaryService
    ) {}

    downloadDocument() {
        this.document$.subscribe(doc => doc.download('russian-individual-entity'));
    }

    downloadBeneficialOwnerDocument() {
        this.beneficialOwnersDocuments$.subscribe(docs => docs.forEach(doc => doc.download('beneficial-owner')));
    }
}
