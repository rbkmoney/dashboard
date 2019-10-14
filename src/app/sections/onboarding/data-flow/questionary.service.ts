import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';

import { Questionary, QuestionaryData } from '../../../api-codegen/questionary';
import { DataFlowService } from './data-flow.service';

@Injectable()
export class QuestionaryService {
    private state$: Subject<QuestionaryData> = new BehaviorSubject<QuestionaryData>(null);

    questionaryData$: Observable<QuestionaryData | null> = this.state$.asObservable();
    questionary$: Observable<Questionary>;

    constructor(private dataFlowService: DataFlowService) {
        this.questionary$ = this.dataFlowService.questionary$;
    }

    add(data: QuestionaryData) {
        this.state$.next(data);
    }

    save(): Observable<void> {
        return of(null);
    }
}
