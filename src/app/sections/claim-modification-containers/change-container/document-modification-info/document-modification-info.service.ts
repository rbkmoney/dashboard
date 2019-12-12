import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, pluck, shareReplay, map } from 'rxjs/operators';

import { QuestionaryService } from '../../../../api';
import { QuestionaryData, Questionary } from '../../../../api-codegen/questionary';
import { DocumentModificationUnit } from '../../../../api-codegen/claim-management';
import { booleanDelay, takeError } from '../../../../custom-operators';
import { QuestionaryDocumentService } from '../../../../questionary-document';

@Injectable()
export class DocumentModificationInfoService {
    private receiveQuestionary$: Subject<string> = new Subject();

    questionary$: Observable<Questionary> = this.receiveQuestionary$.pipe(
        switchMap(documentId => this.questionaryService.getQuestionary(documentId)),
        pluck('questionary'),
        shareReplay(1)
    );

    questionaryData$: Observable<QuestionaryData> = this.questionary$.pipe(pluck('data'));

    document$ = this.questionary$.pipe(
        switchMap(questionary => this.questionaryDocumentService.createDoc(questionary)),
        shareReplay(1)
    );

    beneficialOwnersDocuments$ = this.questionary$.pipe(
        switchMap(questionary => this.questionaryDocumentService.createBeneficialOwnerDocs(questionary)),
        shareReplay(1)
    );

    isLoading$ = this.questionaryData$.pipe(
        booleanDelay(),
        shareReplay(1)
    );

    isError$ = this.questionaryData$.pipe(
        takeError,
        map(err => !!err),
        shareReplay(1)
    );

    constructor(
        private questionaryService: QuestionaryService,
        private questionaryDocumentService: QuestionaryDocumentService
    ) {
        this.questionaryData$.subscribe();
    }

    receiveQuestionary({ documentId }: DocumentModificationUnit) {
        this.receiveQuestionary$.next(documentId);
    }
}
