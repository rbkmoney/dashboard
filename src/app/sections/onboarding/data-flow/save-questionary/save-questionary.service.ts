import { Injectable } from '@angular/core';
import { Subject, Observable, of, zip } from 'rxjs';
import { switchMap, catchError, distinctUntilChanged } from 'rxjs/operators';
import isEqual from 'lodash.isequal';

import { QuestionaryData } from '../../../../api-codegen/questionary';
import { InitialDataService } from '../initial-data.service';
import { QuestionaryService } from '../../../../api';

@Injectable()
export class SaveQuestionaryService {
    private save$: Subject<QuestionaryData> = new Subject();
    private error$: Subject<any> = new Subject();

    saveError$: Observable<boolean> = this.error$.asObservable();

    constructor(private initialDataService: InitialDataService, private questionaryService: QuestionaryService) {
        const actualQuestionary$ = this.initialDataService.initialSnapshot$.pipe(
            switchMap(({ questionary: { id } }) => this.questionaryService.getQuestionary(id))
        );
        this.save$
            .pipe(
                distinctUntilChanged(isEqual),
                switchMap(data => zip(of(data), actualQuestionary$)),
                switchMap(([data, { questionary: { id }, version }]) =>
                    this.questionaryService.saveQuestionary(id, data, version).pipe(
                        catchError(err => {
                            console.error(err);
                            this.error$.next(err);
                            return of(version);
                        })
                    )
                )
            )
            .subscribe();
    }

    save(data: QuestionaryData) {
        this.save$.next(data);
    }
}
