import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { switchMap, shareReplay, map } from 'rxjs/operators';

import { takeRouteParam, takeError, handleNull, booleanDelay } from '../../../custom-operators';
import { ClaimsService, takeDocumentModificationUnit, mapDocumentID, QuestionaryService } from '../../../api';
import { Snapshot } from '../../../api-codegen/questionary';

@Injectable()
export class InitialDataService {
    initialSnapshot$: Observable<Snapshot>;
    initialized$: Observable<boolean>;
    initializeError$: Observable<any>;

    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimsService,
        private questionaryService: QuestionaryService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        const targetClaim$ = this.route.params.pipe(
            takeRouteParam('claimID'),
            switchMap(claimID => this.claimService.getClaimByID(claimID))
        );
        this.initialSnapshot$ = targetClaim$.pipe(
            takeDocumentModificationUnit,
            handleNull('Modification unit is null'),
            mapDocumentID,
            switchMap(id => this.questionaryService.getQuestionary(id)),
            shareReplay(1)
        );
        this.initialized$ = this.initialSnapshot$.pipe(
            booleanDelay(),
            map(r => !r)
        );
        this.initializeError$ = this.initialSnapshot$.pipe(
            takeError,
            shareReplay(1)
        );
        this.initializeError$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }
}
