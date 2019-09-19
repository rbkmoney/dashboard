import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, shareReplay, filter } from 'rxjs/operators';

import { Questionary, QuestionaryData } from '../../../api-codegen/questionary';
import {
    QuestionaryService as QuestionaryApiService,
    takeDocumentModificationUnit,
    mapDocumentID,
    mapQuestionary
} from '../../../api';
import { DataFlowService } from './data-flow.service';

@Injectable()
export class QuestionaryService {
    private questionary$: Observable<Questionary>;

    private state$: Subject<QuestionaryData> = new BehaviorSubject<QuestionaryData>(null);

    questionaryData$: Observable<QuestionaryData | null> = this.state$.asObservable();

    constructor(private questionaryApiService: QuestionaryApiService, private dataFlowService: DataFlowService) {
        this.questionary$ = this.dataFlowService.claim$.pipe(
            takeDocumentModificationUnit,
            mapDocumentID,
            shareReplay(1),
            // TODO need to add filter null operator
            switchMap(id => this.questionaryApiService.getQuestionary(id)),
            mapQuestionary
        );
    }

    add(data: QuestionaryData) {
        this.state$.next(data);
    }

    save(): Observable<void> {
        return of(null);
    }
}
