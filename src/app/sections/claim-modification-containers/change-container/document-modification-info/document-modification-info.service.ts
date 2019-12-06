import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, pluck, shareReplay, map } from 'rxjs/operators';

import { QuestionaryService } from '../../../../api';
import { QuestionaryData } from '../../../../api-codegen/questionary';
import { DocumentModificationUnit } from '../../../../api-codegen/claim-management';
import { booleanDelay, takeError } from '../../../../custom-operators';

@Injectable()
export class DocumentModificationInfoService {
    private receiveQuestionary$: Subject<string> = new Subject();

    questionary$: Observable<QuestionaryData> = this.receiveQuestionary$.pipe(
        switchMap(documentId => this.questionaryService.getQuestionary(documentId)),
        pluck('questionary'),
        pluck('data'),
        shareReplay(1)
    );

    isLoading$ = this.questionary$.pipe(
        booleanDelay(),
        shareReplay(1)
    );

    isError$ = this.questionary$.pipe(
        takeError,
        map(err => !!err),
        shareReplay(1)
    );

    constructor(private questionaryService: QuestionaryService) {
        this.questionary$.subscribe();
    }

    receiveQuestionary({ documentId }: DocumentModificationUnit) {
        this.receiveQuestionary$.next(documentId);
    }
}
