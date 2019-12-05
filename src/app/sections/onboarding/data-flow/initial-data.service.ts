import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subject } from 'rxjs';
import { switchMap, shareReplay, map, first, pluck } from 'rxjs/operators';

import { takeError, handleNull, booleanDelay } from '../../../custom-operators';
import { ClaimsService, takeDocumentModificationUnit, QuestionaryService } from '../../../api';
import { Snapshot } from '../../../api-codegen/questionary';

@Injectable()
export class InitialDataService {
    private initialize$: Subject<number> = new Subject();

    initialSnapshot$: Observable<Snapshot> = this.initialize$.pipe(
        first(),
        switchMap(claimID => this.claimService.getClaimByID(claimID)),
        takeDocumentModificationUnit,
        handleNull('Modification unit is null'),
        pluck('documentId'),
        switchMap(id => this.questionaryService.getQuestionary(id)),
        shareReplay(1)
    );
    initialized$: Observable<boolean> = this.initialSnapshot$.pipe(
        booleanDelay(),
        map(r => !r)
    );
    initializeError$: Observable<any> = this.initialSnapshot$.pipe(
        takeError,
        shareReplay(1)
    );

    constructor(
        private claimService: ClaimsService,
        private questionaryService: QuestionaryService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.initializeError$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    initialize(claimID: number) {
        this.initialize$.next(claimID);
    }
}
