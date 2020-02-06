import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of, Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap, pluck, catchError, tap, shareReplay, filter } from 'rxjs/operators';
import isEqual from 'lodash.isequal';

import { QuestionaryData, Snapshot } from '../../../api-codegen/questionary';
import { QuestionaryService } from '../../../api';
import { booleanDelay } from '../../../custom-operators';

@Injectable()
export class QuestionaryStateService {
    private snapshot$ = new BehaviorSubject<Snapshot>(null);
    private save$ = new Subject<Snapshot>();
    private sub = Subscription.EMPTY;

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
        const save$ = this.save$.pipe(
            distinctUntilChanged(isEqual),
            switchMap(({ questionary: { id, data }, version }: Snapshot) =>
                this.questionaryService.saveQuestionary(id, data, version).pipe(
                    catchError(err => {
                        console.error(err);
                        return of(version);
                    })
                )
            ),
            tap(version =>
                this.update({
                    ...this.snapshot$.getValue(),
                    version
                })
            )
        );
        this.sub = save$.subscribe();
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
        this.save$.next(this.snapshot$.getValue());
    }

    reset() {
        this.snapshot$.next(null);
    }

    receiveSnapshot(documentID: string) {
        this.questionaryService.getQuestionary(documentID).subscribe(snapshot => this.snapshot$.next(snapshot));
    }
}
