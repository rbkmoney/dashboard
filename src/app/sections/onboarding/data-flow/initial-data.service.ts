import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

import { takeError, booleanDelay } from '../../../custom-operators';
import { QuestionaryService } from '../../../api';
import { Snapshot } from '../../../api-codegen/questionary';

@Injectable()
export class SnapshotService {
    private receiveSnapshot$: Subject<string> = new Subject();

    snapshot$: Observable<Snapshot> = this.receiveSnapshot$.pipe(
        switchMap(id => this.questionaryService.getQuestionary(id)),
        shareReplay(1)
    );

    isLoading$: Observable<boolean> = this.snapshot$.pipe(
        booleanDelay(),
        shareReplay(1)
    );

    error$: Observable<any> = this.snapshot$.pipe(
        takeError,
        shareReplay(1)
    );

    constructor(private questionaryService: QuestionaryService) {
        this.receiveSnapshot$.subscribe();
    }

    receive(documentID: string) {
        this.receiveSnapshot$.next(documentID);
    }
}
