import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of, Subject } from 'rxjs';
import { first, map, shareReplay, switchMap } from 'rxjs/operators';

import { booleanDelay, handleNull, takeError } from '../../../custom-operators';
import { ClaimsService, mapDocumentID, takeDocumentModificationUnit } from '../../../api';

@Injectable()
export class InitialDataService {
    private initialize$: Subject<number> = new Subject();

    initialDocs$: Observable<string[]> = this.initialize$.pipe(
        first(),
        switchMap(claimID => this.claimService.getClaimByID(claimID)),
        takeDocumentModificationUnit,
        handleNull('Modification unit is null'),
        mapDocumentID,
        switchMap(() => this.getKekFiles()),
        // switchMap(id => this.questionaryService.getQuestionary(id)),
        shareReplay(1)
    );
    initialized$: Observable<boolean> = this.initialDocs$.pipe(
        booleanDelay(),
        map(r => !r)
    );
    initializeError$: Observable<any> = this.initialDocs$.pipe(
        takeError,
        shareReplay(1)
    );

    private getKekFiles(): Observable<string[]> {
        return of(['kek.pdf', 'omegalul.pdf']);
    };

    constructor(
        private claimService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.initializeError$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    initialize(claimID: number) {
        this.initialize$.next(claimID);
    }
}
