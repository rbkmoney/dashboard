import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { map, pluck, switchMap, withLatestFrom } from 'rxjs/operators';

import { ClaimsService, createFileModificationUnit, takeFileModificationUnits } from '../../../../../api';
import { FileModificationUnit } from '../../../../../api-codegen/claim-management';
import { replaceError, splitReplacedError } from '../../../../../custom-operators';
import { ClaimService } from '../../claim';
import { QuestionaryStateService } from '../../questionary-state.service';
import { StepName } from '../../step-flow';
import { ValidationCheckService } from '../../validation-check';
import { ValidityService } from '../../validity';
import { QuestionaryFormService } from '../questionary-form.service';

@Injectable()
export class UploadDocumentsService extends QuestionaryFormService {
    private filesUploaded$ = new Subject<string[]>();

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
        const [payload$, error$] = splitReplacedError(
            this.filesUploaded$.pipe(
                map((fileIds) => fileIds.map(createFileModificationUnit)),
                withLatestFrom(this.claimService.cliam$),
                switchMap(([changeset, { id, revision }]) =>
                    this.claimsService.updateClaimByID(id, revision, changeset).pipe(replaceError)
                )
            )
        );
        payload$.subscribe(() => this.claimService.reloadCliam());
        error$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('httpError'), 'OK', {
                duration: 5000,
            })
        );
    }

    filesUploaded(fileIds: string[]) {
        this.filesUploaded$.next(fileIds);
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
