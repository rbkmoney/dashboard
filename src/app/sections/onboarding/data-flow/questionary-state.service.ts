import { Injectable } from '@angular/core';
import isEqual from 'lodash.isequal';
import { BehaviorSubject, merge, Observable, Subject, Subscription, EMPTY, combineLatest, of } from 'rxjs';
import { catchError, distinctUntilChanged, filter, pluck, switchMap, tap, take, debounceTime } from 'rxjs/operators';

import { QuestionaryService } from '../../../api';
import { QuestionaryData, Snapshot } from '../../../api-codegen/questionary';
import { booleanDelay } from '../../../custom-operators';

@Injectable()
export class QuestionaryStateService {
    private snapshot$: BehaviorSubject<Snapshot | null> = new BehaviorSubject<Snapshot>(null);
    private initSnapshot$: Subject<string> = new Subject();
    private save$ = new Subject<number>();
    private sub: Subscription = Subscription.EMPTY;

    questionaryData$: Observable<QuestionaryData> = this.snapshot$.pipe(
        filter((v) => v !== null),
        pluck('questionary', 'data'),
        distinctUntilChanged(isEqual)
    );

    isLoading$ = this.questionaryData$.pipe(booleanDelay());

    constructor(private questionaryService: QuestionaryService) {}

    subscribe() {
        const initSnapshot$ = this.initSnapshot$.pipe(
            switchMap((documentID) => this.questionaryService.getQuestionary(documentID)),
            tap((snapshot) => this.snapshot$.next(snapshot))
        );
        const save$ = this.save$.pipe(
            switchMap((iter) => combineLatest([of(iter), this.snapshot$.pipe(take(1))])),
            debounceTime(1000),
            distinctUntilChanged(([, x], [, y]) => isEqual(x, y)),
            switchMap(([iter, { questionary: { id, data }, version }]) =>
                this.questionaryService.saveQuestionary(id, data, version).pipe(
                    catchError((err) => {
                        console.error(err);
                        if (!iter) {
                            console.warn(`Update snapshot version & save`);
                            this.questionaryService.getQuestionary(id).subscribe(({ version }) => {
                                this.snapshot$.next({ ...this.snapshot$.getValue(), version });
                                this.save$.next(iter + 1);
                            });
                        }
                        return EMPTY;
                    })
                )
            ),
            tap((version) => this.snapshot$.next({ ...this.snapshot$.getValue(), version }))
        );
        this.sub = merge(initSnapshot$, save$).subscribe();
    }

    unsubscribe() {
        this.sub.unsubscribe();
    }

    add(data: QuestionaryData) {
        const s = this.snapshot$.getValue();
        this.snapshot$.next({
            ...s,
            questionary: {
                ...s.questionary,
                data,
            },
        });
    }

    save() {
        this.save$.next(0);
    }

    reset() {
        this.snapshot$.next(null);
    }

    receiveSnapshot(documentID: string) {
        this.initSnapshot$.next(documentID);
    }
}
