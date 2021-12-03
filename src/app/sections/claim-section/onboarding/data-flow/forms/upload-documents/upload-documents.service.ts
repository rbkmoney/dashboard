import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { map, pluck, share, switchMap, withLatestFrom } from 'rxjs/operators';

import { FileModification, FileModificationUnit } from '@dsh/api-codegen/claim-management';
import { QuestionaryData } from '@dsh/api-codegen/questionary';
import { ClaimsService, createFileModificationUnit, takeFileModificationUnits } from '@dsh/api/claims';
import { ContextService } from '@dsh/app/shared/services/context';
import { filterError, filterPayload, replaceError } from '@dsh/operators';

import { ClaimService } from '../../claim';
import { QuestionaryStateService } from '../../questionary-state.service';
import { StepName } from '../../step-flow';
import { ValidationCheckService } from '../../validation-check';
import { ValidityService } from '../../validity';
import { QuestionaryFormService } from '../questionary-form.service';

@UntilDestroy()
@Injectable()
export class UploadDocumentsService extends QuestionaryFormService {
    fileUnits$: Observable<FileModificationUnit[]> = this.claimService.claim$.pipe(
        pluck('changeset'),
        map(takeFileModificationUnits)
    );

    private filesUploaded$ = new Subject<string[]>();
    private deleteFile$ = new Subject<FileModificationUnit>();

    constructor(
        questionaryStateService: QuestionaryStateService,
        validityService: ValidityService,
        validationCheckService: ValidationCheckService,
        private claimService: ClaimService,
        private claimsService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private contextService: ContextService
    ) {
        super(questionaryStateService, validityService, validationCheckService);
        const uploadedFilesWithError$ = this.filesUploaded$.pipe(
            map((fileIds) => fileIds.map((id) => createFileModificationUnit(id))),
            withLatestFrom(this.claimService.claim$, this.contextService.organization$),
            switchMap(([changeset, { id, revision }, org]) =>
                this.claimsService.updateClaimByID(org.id, id, revision, changeset).pipe(replaceError)
            ),
            share()
        );
        const deletedFilesWithError$ = this.deleteFile$.pipe(
            map((unit) => [
                createFileModificationUnit(unit.fileId, FileModification.FileModificationTypeEnum.FileDeleted),
            ]),
            withLatestFrom(this.claimService.claim$, this.contextService.organization$),
            switchMap(([changeset, { id, revision }, org]) =>
                this.claimsService.updateClaimByID(org.id, id, revision, changeset).pipe(replaceError)
            ),
            share()
        );
        const result$ = merge(uploadedFilesWithError$, deletedFilesWithError$).pipe(share());
        result$.pipe(filterPayload, untilDestroyed(this)).subscribe(() => this.claimService.reloadClaim());
        result$.pipe(filterError, untilDestroyed(this)).subscribe(() =>
            this.snackBar.open(this.transloco.translate('httpError'), 'OK', {
                duration: 5000,
            })
        );
    }

    filesUploaded(fileIds: string[]): void {
        this.filesUploaded$.next(fileIds);
    }

    deleteFile(unit: FileModificationUnit): void {
        this.deleteFile$.next(unit);
    }

    startFormValidityReporting(): Subscription {
        return this.fileUnits$
            .pipe(map(({ length }) => !!length))
            .subscribe((isValid) => this.validityService.setUpValidity(this.stepName, isValid));
    }

    protected toForm(): FormGroup {
        return new FormGroup({});
    }

    protected applyToQuestionaryData(data: QuestionaryData): QuestionaryData {
        return data;
    }

    protected getStepName(): StepName {
        return StepName.UploadDocuments;
    }
}
