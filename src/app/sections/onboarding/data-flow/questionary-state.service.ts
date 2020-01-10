import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { filter, distinctUntilChanged, switchMap, pluck, catchError, first } from 'rxjs/operators';
import isEqual from 'lodash.isequal';

import { QuestionaryData, Snapshot } from '../../../api-codegen/questionary';
import { QuestionaryService } from '../../../api';

@Injectable()
export class QuestionaryStateService {
    private snapshot$: BehaviorSubject<Snapshot> = new BehaviorSubject<Snapshot>(null);
    private initSnapshot$: Subject<string> = new Subject();
    private save$: Subject<void> = new Subject();

    questionaryData$: Observable<QuestionaryData> = this.snapshot$.pipe(
        filter(v => v !== null),
        pluck('questionary', 'data'),
        distinctUntilChanged(isEqual)
    );

    constructor(private questionaryService: QuestionaryService) {
        this.initSnapshot$
            .pipe(switchMap(documentID => this.questionaryService.getQuestionary(documentID)))
            .subscribe(snapshot => this.snapshot$.next(snapshot));
        this.save$
            .pipe(
                switchMap(() => this.snapshot$.pipe(first())),
                distinctUntilChanged((x, y) => isEqual(x.questionary.data, y.questionary.data)),
                switchMap(({ questionary: { id, data }, version }) =>
                    this.questionaryService.saveQuestionary(id, data, version).pipe(
                        catchError(err => {
                            console.error(err);
                            return of(version);
                        })
                    )
                )
            )
            .subscribe(version => {
                this.snapshot$.next({
                    ...this.snapshot$.getValue(),
                    version
                });
            });
    }

    add(data: QuestionaryData) {
        const s = this.snapshot$.getValue();
        this.snapshot$.next({
            ...s,
            questionary: {
                ...s.questionary,
                data
            }
        });
    }

    save() {
        this.save$.next();
    }

    reset() {
        this.snapshot$.next(null);
    }

    init(documentID: string) {
        this.initSnapshot$.next(documentID);
    }
}
