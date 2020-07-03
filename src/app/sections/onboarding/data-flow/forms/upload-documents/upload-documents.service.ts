import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subject } from 'rxjs';
import { map, pluck, share, switchMap, withLatestFrom } from 'rxjs/operators';

import { ClaimsService, createFileModificationUnit, takeFileModificationUnits } from '../../../../../api';
import { FileModification, FileModificationUnit } from '../../../../../api-codegen/claim-management';
import { replaceError } from '../../../../../custom-operators';
import { ClaimService } from '../../claim';
import { QuestionaryStateService } from '../../questionary-state.service';
import { StepName } from '../../step-flow';
import { ValidationCheckService } from '../../validation-check';
import { ValidityService } from '../../validity';
import { QuestionaryFormService } from '../questionary-form.service';
import { filterError, filterPayload } from './../../../../../custom-operators/replace-error';

@Injectable()
export class UploadDocumentsService extends QuestionaryFormService {
    private filesUploaded$ = new Subject<string[]>();
    private deleteFile$ = new Subject<FileModificationUnit>();

    fileUnits$: Observable<FileModificationUnit[]> = this.claimService.cliam$.pipe(
        pluck('changeset'),
        map(takeFileModificationUnits)
    );

    constructor(
        questionaryStateService: QuestionaryStateService,
        validityService: ValidityService,
        validationCheckService: ValidationCheckService,
        private claimService: ClaimService,
        private claimsService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        super(questionaryStateService, validityService, validationCheckService);
        const uploadedFilesWithError$ = this.filesUploaded$.pipe(
            map((fileIds) => fileIds.map((id) => createFileModificationUnit(id))),
            withLatestFrom(this.claimService.cliam$),
            switchMap(([changeset, { id, revision }]) =>
                this.claimsService.updateClaimByID(id, revision, changeset).pipe(replaceError)
            ),
            share()
        );
        uploadedFilesWithError$.pipe(filterPayload).subscribe(() => this.claimService.reloadCliam());
        uploadedFilesWithError$.pipe(filterError).subscribe(() =>
            this.snackBar.open(this.transloco.translate('httpError'), 'OK', {
                duration: 5000,
            })
        );
        this.deleteFile$
            .pipe(
                map((unit) => [
                    createFileModificationUnit(unit.fileId, FileModification.FileModificationTypeEnum.FileDeleted),
                ]),
                withLatestFrom(this.claimService.cliam$),
                switchMap(([changeset, { id, revision }]) =>
                    this.claimsService.updateClaimByID(id, revision, changeset)
                )
            )
            .subscribe((unit) => {
                console.log('deleted');
            });
    }

    filesUploaded(fileIds: string[]) {
        this.filesUploaded$.next(fileIds);
    }

    deleteFile(unit: FileModificationUnit) {
        this.deleteFile$.next(unit);
    }

    protected toForm() {
        return new FormGroup({});
    }

    protected applyToQuestionaryData(data) {
        return data;
    }

    protected getStepName(): StepName {
        return StepName.UploadDocuments;
    }

    startFormValidityReporting() {
        return this.fileUnits$
            .pipe(map(({ length }) => !!length))
            .subscribe((isValid) => this.validityService.setUpValidity(this.stepName, isValid));
    }
}
