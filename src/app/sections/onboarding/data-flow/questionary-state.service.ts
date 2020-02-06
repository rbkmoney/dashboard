import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of, Subscription, merge } from 'rxjs';
import { distinctUntilChanged, switchMap, pluck, catchError, first, tap, shareReplay, filter } from 'rxjs/operators';
import isEqual from 'lodash.isequal';

import { QuestionaryData, Snapshot } from '../../../api-codegen/questionary';
import { QuestionaryService } from '../../../api';
import { booleanDelay } from '../../../custom-operators';

@Injectable()
export class QuestionaryStateService {
    private snapshot$: BehaviorSubject<Snapshot | null> = new BehaviorSubject<Snapshot>(null);
    private initSnapshot$: Subject<string> = new Subject();
    private save$: Subject<void> = new Subject();
    private sub: Subscription = Subscription.EMPTY;

    get questionaryData() {
        return this.snapshot$.getValue().questionary.data;
    }

    questionaryData$: Observable<QuestionaryData> = this.snapshot$.pipe(
        filter(v => v !== null),
        pluck('questionary', 'data'),
        shareReplay(1)
    );

    isLoading$ = this.questionaryData$.pipe(booleanDelay());

    constructor(private questionaryService: QuestionaryService) {}

    private update(nextSnapshot: Snapshot) {
        if (!isEqual(this.snapshot$.getValue(), nextSnapshot)) {
            this.snapshot$.next(nextSnapshot);
        }
    }

    subscribe() {
        const initSnapshot$ = this.initSnapshot$.pipe(
            switchMap(documentID => this.questionaryService.getQuestionary(documentID)),
            tap(snapshot => this.snapshot$.next(snapshot))
        );
        const save$ = this.save$.pipe(
            switchMap(() => this.snapshot$.pipe(first())),
            distinctUntilChanged((x, y) => isEqual(x.questionary.data, y.questionary.data)),
            switchMap(({ questionary: { id, data }, version }) =>
                this.questionaryService.saveQuestionary(id, data, version).pipe(
                    catchError(err => {
                        console.error(err);
                        return of(version);
                    })
                )
            ),
            tap(version => {
                this.snapshot$.next({
                    ...this.snapshot$.getValue(),
                    version
                });
            })
        );
        this.sub = merge(initSnapshot$, save$).subscribe();
    }

    unsubscribe() {
        this.sub.unsubscribe();
    }

    add(data: QuestionaryData) {
        const snapshot = this.snapshot$.getValue();
        this.update({
            ...snapshot,
            questionary: {
                ...snapshot.questionary,
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

    receiveSnapshot(documentID: string) {
        this.initSnapshot$.next(documentID);
    }
}
