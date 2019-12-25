import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { pluck, filter, distinctUntilChanged } from 'rxjs/operators';
import isEqual from 'lodash.isequal';

import { QuestionaryData } from '../../../api-codegen/questionary';
import { InitialDataService } from './initial-data.service';
import { SaveQuestionaryService } from './save-questionary';

@Injectable()
export class QuestionaryStateService {
    private state$: BehaviorSubject<QuestionaryData> = new BehaviorSubject<QuestionaryData>(null);

    questionaryData$: Observable<QuestionaryData> = this.state$.pipe(
        distinctUntilChanged(isEqual),
        filter(v => v !== null)
    );

    constructor(
        private initialDataService: InitialDataService,
        private questionarySaveService: SaveQuestionaryService
    ) {
        this.initialDataService.initialSnapshot$
            .pipe(pluck('questionary', 'data'))
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

    resetState() {
        this.state$.next(null);
    }
}
