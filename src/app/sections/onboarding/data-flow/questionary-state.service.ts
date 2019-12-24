import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { pluck, filter, shareReplay, tap } from 'rxjs/operators';

import { QuestionaryData } from '../../../api-codegen/questionary';
import { InitialDataService } from './initial-data.service';
import { SaveQuestionaryService } from './save-questionary';

@Injectable()
export class QuestionaryStateService {
    private state$: BehaviorSubject<QuestionaryData> = new BehaviorSubject<QuestionaryData>(null);

    questionaryData$: Observable<QuestionaryData> = this.state$.pipe(
        tap(r => console.log('questionaryData$', r)),
        filter(v => v !== null),
        shareReplay(1)
    );

    constructor(
        private initialDataService: InitialDataService,
        private questionarySaveService: SaveQuestionaryService
    ) {}

    init(): Subscription {
        return this.initialDataService.initialSnapshot$
            .pipe(
                pluck('questionary', 'data'),
                tap(r => console.log('initialSnapshot$', r))
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
