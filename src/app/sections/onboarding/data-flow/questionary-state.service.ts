import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { first, pluck, filter } from 'rxjs/operators';

import { QuestionaryData } from '../../../api-codegen/questionary';
import { InitialDataService } from './initial-data.service';
import { SaveQuestionaryService } from './save-questionary';

@Injectable()
export class QuestionaryStateService {
    private state$: BehaviorSubject<QuestionaryData> = new BehaviorSubject<QuestionaryData>(null);

    questionaryData$: Observable<QuestionaryData | null> = this.state$.pipe(filter(v => v !== null));

    constructor(private dataFlowService: InitialDataService, private questionarySaveService: SaveQuestionaryService) {
        this.dataFlowService.initialSnapshot$
            .pipe(
                pluck('questionary', 'data'),
                first()
            )
            .subscribe(data => this.state$.next(data));
    }

    add(data: QuestionaryData) {
        this.state$.next(data);
    }

    save() {
        const value = this.state$.getValue();
        if (value) {
            this.questionarySaveService.save(value);
        }
    }
}
