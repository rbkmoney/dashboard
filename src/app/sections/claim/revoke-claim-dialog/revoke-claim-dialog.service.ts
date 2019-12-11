import { Injectable, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, pluck, catchError, tap, filter } from 'rxjs/operators';
import get from 'lodash.get';

import { ClaimsService } from '../../../api';
import { RevokeClaimDialogComponent } from './revoke-claim-dialog.component';
import { UIError } from '../../ui-error';
import { progress } from '../../../custom-operators';

@Injectable()
export class RevokeClaimDialogService {
    private revoke$: Subject<string> = new Subject();
    private error$: BehaviorSubject<UIError> = new BehaviorSubject({ hasError: false });

    errorCode$: Observable<string> = this.error$.pipe(pluck('code'));
    inProgress$: Observable<boolean> = progress(this.revoke$, this.error$);
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<RevokeClaimDialogComponent, 'cancel' | 'revoked'>,
        private claimsApiService: ClaimsService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: { claimId: number; revision: number }
    ) {
        this.form = this.fb.group({
            reason: ['', [Validators.required, Validators.maxLength(1000)]]
        });
        this.revoke$
            .pipe(
                tap(() => this.error$.next({ hasError: false })),
                switchMap(reason =>
                    this.claimsApiService.revokeClaimByID(this.data.claimId, this.data.revision, reason).pipe(
                        catchError(ex => {
                            console.error(ex);
                            const error = { hasError: true, code: 'revokeClaimByIDFailed' };
                            this.error$.next(error);
                            return of(error);
                        })
                    )
                ),
                filter(res => get(res, ['hasError']) !== true)
            )
            .subscribe(() => this.dialogRef.close('revoked'));
    }

    back() {
        this.dialogRef.close('cancel');
    }

    revoke(reason: string) {
        this.revoke$.next(reason);
    }
}
