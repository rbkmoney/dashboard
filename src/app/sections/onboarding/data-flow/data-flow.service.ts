import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { switchMap, shareReplay, map, tap } from 'rxjs/operators';

import { takeRouteParam, takeError, handleNull, booleanDelay } from '../../../custom-operators';
import {
    ClaimsService,
    takeDocumentModificationUnit,
    mapDocumentID,
    mapQuestionary,
    QuestionaryService
} from '../../../api';
import { Questionary } from '../../../api-codegen/questionary';

@Injectable()
export class DataFlowService {
    questionary$: Observable<Questionary>;
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
        this.questionary$ = targetClaim$.pipe(
            takeDocumentModificationUnit,
            handleNull('Modification unit is null'),
            mapDocumentID,
            switchMap(id => this.questionaryService.getQuestionary(id)),
            mapQuestionary,
            shareReplay(1)
        );
        this.initialized$ = this.questionary$.pipe(
            booleanDelay(),
            map(r => !r)
        );
        this.initializeError$ = this.questionary$.pipe(
            takeError,
            tap(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'))
        );
    }
}
