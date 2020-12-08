import { Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import get from 'lodash.get';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, filter, pluck, switchMap, tap } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';

import { progress } from '../../../custom-operators';
import { UIError } from '../../ui-error';
import { RevokeClaimDialogComponent } from './revoke-claim-dialog.component';

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
            reason: ['', [Validators.required, Validators.maxLength(1000)]],
        });
        this.revoke$
            .pipe(
                tap(() => this.error$.next({ hasError: false })),
                switchMap((reason) =>
                    this.claimsApiService.revokeClaimByID(this.data.claimId, this.data.revision, reason).pipe(
                        catchError((ex) => {
                            console.error(ex);
                            const error = { hasError: true, code: 'revokeClaimByIDFailed' };
                            this.error$.next(error);
                            return of(error);
                        })
                    )
                ),
                filter((res) => get(res, ['hasError']) !== true)
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
