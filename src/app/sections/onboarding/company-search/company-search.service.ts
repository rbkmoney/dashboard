import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import isNil from 'lodash-es/isNil';
import { combineLatest, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, filter, map, mapTo, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { OrgType, PartyContent, ReqResponse } from '@dsh/api-codegen/aggr-proxy';
import { Claim } from '@dsh/api-codegen/claim-management';
import { QuestionaryData } from '@dsh/api-codegen/questionary';
import {
    ClaimsService,
    createDocumentModificationUnit,
    isClaimModification,
    isExternalInfoModificationUnit,
} from '@dsh/api/claims';
import { KonturFocusService } from '@dsh/api/kontur-focus';
import { QuestionaryService } from '@dsh/api/questionary';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';
import { SHARE_REPLAY_CONF } from '@dsh/operators';

import { KeycloakService } from '../../../auth';

@UntilDestroy()
@Injectable()
export class CompanySearchService {
    form: FormGroup = this.fb.group({
        searchStr: '',
    });

    private leaveOnboarding$ = new Subject();

    private claimID$ = this.route.params.pipe(
        switchMap(({ claimID }) => of<number>(isNil(claimID) ? null : Number(claimID))),
        shareReplay(SHARE_REPLAY_CONF)
    );
    private claim$ = this.claimID$.pipe(
        switchMap((claimID) =>
            isNil(claimID)
                ? of<Claim>(null)
                : this.claimsService.getClaimByID(claimID).pipe(catchError(() => of<Claim>(null)))
        ),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private fb: FormBuilder,
        private claimsService: ClaimsService,
        private questionaryService: QuestionaryService,
        private transloco: TranslocoService,
        private snackBar: MatSnackBar,
        private konturFocusService: KonturFocusService,
        private keycloakService: KeycloakService,
        private idGenerator: IdGeneratorService,
        private route: ActivatedRoute
    ) {
        this.leaveOnboarding$
            .pipe(
                switchMap(() => this.dialog.open(ConfirmActionDialogComponent).afterClosed()),
                filter((r) => r === 'confirm'),
                untilDestroyed(this)
            )
            .subscribe(() => void this.router.navigate(['/']));
        combineLatest(this.claim$, this.claimID$)
            .pipe(untilDestroyed(this))
            .subscribe(([claim, claimID]) => {
                if (
                    (claimID && !claim) ||
                    (claim &&
                        !claim.changeset.every(
                            (c) =>
                                isClaimModification(c.modification) &&
                                isExternalInfoModificationUnit(c.modification.claimModificationType)
                        ))
                )
                    void this.router.navigate(['/onboarding']);
            });
    }

    isKnownOrgType({ orgType }: PartyContent): boolean {
        return Object.values(OrgType).includes(orgType);
    }

    createInitialClaim(data: QuestionaryData): Observable<{ claimID: number; documentID: string }> {
        const documentID = this.idGenerator.uuid();
        const changeset = [createDocumentModificationUnit(documentID)];
        const defaultEmail = this.keycloakService.getUsername();
        const questionaryData: QuestionaryData = { ...data, contactInfo: { email: defaultEmail, ...data.contactInfo } };
        return this.claim$.pipe(
            switchMap((claim) =>
                claim
                    ? this.claimsService.updateClaimByID(claim.id, claim.revision, changeset).pipe(mapTo(claim.id))
                    : this.questionaryService.saveQuestionary(documentID, questionaryData).pipe(
                          switchMap(() => this.claimsService.createClaim(changeset)),
                          pluck('id')
                      )
            ),
            catchError((err) => {
                this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                return throwError(err);
            }),
            map((claimID) => ({ documentID, claimID }))
        );
    }

    goToOnboardingFlow(claimID: number, documentID: string): void {
        void this.router.navigate(['onboarding', 'claim', claimID, 'document', documentID, 'step', 'basic-info']);
    }

    leaveOnboarding(): void {
        this.leaveOnboarding$.next();
    }

    loadKonturFocusData(inn: string): Observable<ReqResponse> {
        return this.konturFocusService
            .request('ReqQuery', {
                inn: [inn],
            })
            .pipe(pluck(0));
    }
}
