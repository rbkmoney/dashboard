import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import isNil from 'lodash-es/isNil';
import { combineLatest, Observable, of, Subject, throwError, EMPTY } from 'rxjs';
import { catchError, filter, map, mapTo, pluck, switchMap, withLatestFrom } from 'rxjs/operators';

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
import { ContextService } from '@dsh/app/shared/services/context';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';
import { shareReplayRefCount } from '@dsh/operators';

import { KeycloakService } from '../../../../auth';

@UntilDestroy()
@Injectable()
export class CompanySearchService {
    form: FormGroup<{ searchStr: string }> = this.fb.group({
        searchStr: '',
    });

    private leaveOnboarding$ = new Subject();

    private claimID$ = this.route.params.pipe(
        switchMap(({ claimID }) => of<number>(isNil(claimID) ? null : Number(claimID))),
        shareReplayRefCount()
    );
    private claim$ = combineLatest([this.contextService.organization$, this.claimID$]).pipe(
        switchMap(([org, claimID]) =>
            isNil(claimID)
                ? of<Claim>(null)
                : this.claimsService.getClaimByID(org.id, claimID).pipe(catchError(() => of<Claim>(null)))
        ),
        shareReplayRefCount()
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
        private route: ActivatedRoute,
        private contextService: ContextService
    ) {
        this.leaveOnboarding$
            .pipe(
                switchMap(() => this.dialog.open(ConfirmActionDialogComponent).afterClosed()),
                filter((r) => r === 'confirm'),
                untilDestroyed(this)
            )
            .subscribe(() => void this.router.navigate(['/']));
        combineLatest(this.claim$, this.claimID$)
            .pipe(
                switchMap(([claim, claimID]) => {
                    if (
                        (claimID && !claim) ||
                        (claim &&
                            !claim.changeset.every(
                                (c) =>
                                    isClaimModification(c.modification) &&
                                    isExternalInfoModificationUnit(c.modification.claimModificationType)
                            ))
                    )
                        return this.contextService.navigate(['onboarding']);
                    return EMPTY;
                }),
                untilDestroyed(this)
            )
            .subscribe();
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
            withLatestFrom(this.contextService.organization$),
            switchMap(([claim, org]) =>
                claim
                    ? this.claimsService
                          .updateClaimByID(org.id, claim.id, claim.revision, changeset)
                          .pipe(mapTo(claim.id))
                    : this.questionaryService.saveQuestionary(documentID, questionaryData).pipe(
                          switchMap(() => this.claimsService.createClaim(org.id, changeset)),
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
        void this.router.navigate([
            'claim-section',
            'onboarding',
            'claim',
            claimID,
            'document',
            documentID,
            'step',
            'basic-info',
        ]);
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
