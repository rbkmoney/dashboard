import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, of, zip } from 'rxjs';
import { shareReplay, switchMap, catchError, distinctUntilChanged } from 'rxjs/operators';
import isEqual from 'lodash.isequal';

import { QuestionaryData, Version } from '../../../../api-codegen/questionary';
import { InitialDataService } from '../initial-data.service';
import { QuestionaryService } from '../../../../api';

const LOADING_DELAY = 500;

@Injectable()
export class SaveQuestionaryService {
    private save$: Subject<QuestionaryData> = new Subject();
    private error$: Subject<any> = new Subject();
    private version$: Subject<Version | null> = new BehaviorSubject(null);
    private saveUntilChanged$ = this.save$.pipe(distinctUntilChanged(isEqual));

    private actualQuestionary$ = this.initialDataService.initialSnapshot$.pipe(
        switchMap(({ questionary: { id } }) => this.questionaryService.getQuestionary(id))
    );

    private saveFlow$ = this.saveUntilChanged$.pipe(
        switchMap(data => zip(of(data), this.actualQuestionary$)),
        switchMap(([data, { questionary: { id }, version }]) =>
            this.questionaryService.saveQuestionary(id, data, version).pipe(
                catchError(err => {
                    console.error(err);
                    this.error$.next(err);
                    return of(version);
                })
            )
        ),
        shareReplay(1)
    );

    // isSaving$: Observable<boolean> = this.saveFlow$.pipe(booleanDelay(LOADING_DELAY, this.saveUntilChanged$));
    saveError$: Observable<boolean> = this.error$.asObservable();

    constructor(private initialDataService: InitialDataService, private questionaryService: QuestionaryService) {
        this.saveFlow$.subscribe(v => this.version$.next(v));
    }

    save(data: QuestionaryData) {
        this.save$.next(data);
    }

    resetVersion() {
        this.version$.next(null);
    }
}
