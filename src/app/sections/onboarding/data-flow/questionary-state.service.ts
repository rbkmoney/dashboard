import { Injectable } from '@angular/core';
import isEqual from 'lodash-es/isEqual';
import { BehaviorSubject, merge, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, filter, first, pluck, switchMap, tap } from 'rxjs/operators';

import { QuestionaryData, Snapshot } from '@dsh/api-codegen/questionary';
import { QuestionaryService } from '@dsh/api/questionary';

import { booleanDelay } from '../../../custom-operators';

@Injectable()
export class QuestionaryStateService {
    private snapshot$: BehaviorSubject<Snapshot | null> = new BehaviorSubject<Snapshot>(null);
    private initSnapshot$: Subject<string> = new Subject();
    private save$: Subject<void> = new Subject();
    private sub: Subscription = Subscription.EMPTY;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    questionaryData$: Observable<QuestionaryData> = this.snapshot$.pipe(
        filter((v) => v !== null),
        pluck('questionary', 'data'),
        distinctUntilChanged(isEqual)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = this.questionaryData$.pipe(booleanDelay());

    constructor(private questionaryService: QuestionaryService) {}

    subscribe() {
        const initSnapshot$ = this.initSnapshot$.pipe(
            switchMap((documentID) => this.questionaryService.getQuestionary(documentID)),
            tap((snapshot) => this.snapshot$.next(snapshot))
        );
        const save$ = this.save$.pipe(
            switchMap(() => this.snapshot$.pipe(first())),
            distinctUntilChanged((x, y) => isEqual(x.questionary.data, y.questionary.data)),
            switchMap(({ questionary: { id, data }, version }) =>
                this.questionaryService.saveQuestionary(id, data, version).pipe(
                    catchError((err) => {
                        console.error(err);
                        return of(version);
                    })
                )
            ),
            tap((version) => {
                this.snapshot$.next({
                    ...this.snapshot$.getValue(),
                    version,
                });
            })
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
        this.save$.next();
    }

    reset() {
        this.snapshot$.next(null);
    }

    receiveSnapshot(documentID: string) {
        this.initSnapshot$.next(documentID);
    }
}
