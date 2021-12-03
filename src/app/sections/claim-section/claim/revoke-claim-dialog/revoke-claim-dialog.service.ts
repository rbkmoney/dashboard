import { Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { progress } from '@rbkmoney/utils';
import get from 'lodash-es/get';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, filter, pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';
import { ContextService } from '@dsh/app/shared/services/context';

import { UiError } from '../../../ui-error';
import { RevokeClaimDialogComponent } from './revoke-claim-dialog.component';

@Injectable()
export class RevokeClaimDialogService {
    private revoke$: Subject<string> = new Subject();
    private error$: BehaviorSubject<UiError> = new BehaviorSubject({ hasError: false });

    // eslint-disable-next-line @typescript-eslint/member-ordering
    errorCode$: Observable<string> = this.error$.pipe(pluck('code'));
    // eslint-disable-next-line @typescript-eslint/member-ordering
    inProgress$: Observable<boolean> = progress(this.revoke$, this.error$);
    // eslint-disable-next-line @typescript-eslint/member-ordering
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<RevokeClaimDialogComponent, 'cancel' | 'revoked'>,
        private claimsApiService: ClaimsService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) private data: { claimId: number; revision: number },
        private contextService: ContextService
    ) {
        this.form = this.fb.group({
            reason: ['', [Validators.required, Validators.maxLength(1000)]],
        });
        this.revoke$
            .pipe(
                tap(() => this.error$.next({ hasError: false })),
                withLatestFrom(this.contextService.organization$),
                switchMap(([reason, org]) =>
                    this.claimsApiService.revokeClaimByID(org.id, this.data.claimId, this.data.revision, reason).pipe(
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
