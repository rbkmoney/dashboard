import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { pluck, filter, distinctUntilChanged, switchMap } from 'rxjs/operators';
import isEqual from 'lodash.isequal';

import { QuestionaryData } from '../../../api-codegen/questionary';
import { SnapshotService } from './initial-data.service';
import { SaveQuestionaryService } from './save-questionary';
import { QuestionaryService } from '../../../api';

@Injectable()
export class QuestionaryStateService {
    private state$: BehaviorSubject<QuestionaryData> = new BehaviorSubject<QuestionaryData>(null);
    private init$: Subject<string> = new Subject();

    questionaryData$: Observable<QuestionaryData> = this.state$.pipe(
        distinctUntilChanged(isEqual),
        filter(v => v !== null)
    );

    constructor(
        private initialDataService: SnapshotService,
        private questionarySaveService: SaveQuestionaryService,
        private questionaryService: QuestionaryService
    ) {
        this.initialDataService.snapshot$.pipe(pluck('questionary', 'data')).subscribe(data => this.state$.next(data));
        this.init$.pipe(switchMap(id => this.questionaryService.getQuestionary(id))).subscribe();
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
