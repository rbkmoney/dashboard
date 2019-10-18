import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { shareReplay, switchMap, catchError, distinctUntilChanged } from 'rxjs/operators';

import { QuestionaryData, Version } from '../../../../api-codegen/questionary';
import { InitialDataService } from '../initial-data.service';
import { QuestionaryService } from '../../../../api';
import { booleanDelay } from '../../../../custom-operators';
import { mapToSaveQuestionaryContext } from './map-to-save-questionary-context';
import { compareQuestionaryData } from './compare-questionary-data';

const LOADING_DELAY = 500;

@Injectable()
export class SaveQuestionaryService {
    private save$: Subject<QuestionaryData> = new Subject();
    private error$: Subject<any> = new Subject();
    private version$: Subject<Version | null> = new BehaviorSubject(null);
    private saveUntilChanged$ = this.save$.pipe(distinctUntilChanged(compareQuestionaryData));
    private saveFlow$ = this.saveUntilChanged$.pipe(
        mapToSaveQuestionaryContext(this.version$, this.dataFlowService.initialSnapshot$),
        switchMap(({ questionaryID, version, data }) =>
            this.questionaryService.saveQuestionary(questionaryID, data, version).pipe(
                catchError(err => {
                    console.error(err);
                    this.error$.next(err);
                    return of(version);
                })
            )
        ),
        shareReplay(1)
    );

    isSaving$: Observable<boolean> = this.saveFlow$.pipe(booleanDelay(LOADING_DELAY, this.saveUntilChanged$));
    saveError$: Observable<boolean> = this.error$.asObservable();

    constructor(private dataFlowService: InitialDataService, private questionaryService: QuestionaryService) {
        this.saveFlow$.subscribe(v => this.version$.next(v));
    }

    save(data: QuestionaryData) {
        this.save$.next(data);
    }
}
