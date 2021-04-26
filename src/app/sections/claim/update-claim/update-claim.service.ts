import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, filter, pluck, share, switchMap, tap } from 'rxjs/operators';

import { FileModification } from '@dsh/api-codegen/claim-management';
import { Conversation } from '@dsh/api-codegen/messages';
import { ClaimsService } from '@dsh/api/claims';

import { progress } from '../../../custom-operators';
import { UiError } from '../../ui-error';
import { ReceiveClaimService } from '../receive-claim.service';
import { RouteParamClaimService } from '../route-param-claim.service';
import { UpdateConversationParams, UpdateFilesParams, UpdateParams } from './model';
import { toChangeset } from './to-changeset';

@Injectable()
export class UpdateClaimService {
    private updateBy$ = new Subject<UpdateParams>();
    private error$ = new BehaviorSubject<UiError>({ hasError: false });

    // eslint-disable-next-line @typescript-eslint/member-ordering
    errorCode$: Observable<string> = this.error$.pipe(
        filter((err) => err.hasError),
        pluck('code')
    );
    // eslint-disable-next-line @typescript-eslint/member-ordering
    inProgress$: Observable<boolean>;

    constructor(
        private receiveClaimService: ReceiveClaimService,
        private routeParamClaimService: RouteParamClaimService,
        private claimApiService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        const updated$ = this.updateBy$.pipe(
            tap(() => this.error$.next({ hasError: false })),
            toChangeset,
            switchMap((changeset) => combineLatest([of(changeset), this.routeParamClaimService.claim$])),
            switchMap(([changeset, { id, revision }]) =>
                this.claimApiService.updateClaimByID(id, revision, changeset).pipe(
                    catchError((ex) => {
                        console.error(ex);
                        const error = { hasError: true, code: 'updateClaimByIDFailed' };
                        this.error$.next(error);
                        return of(error);
                    })
                )
            ),
            share()
        );

        this.inProgress$ = progress(this.updateBy$, updated$);
        updated$.subscribe(() => this.receiveClaimService.receiveClaim());
        this.errorCode$.subscribe((code) =>
            this.snackBar.open(this.transloco.translate(`errors.${code}`), 'OK', {
                duration: 5000,
            })
        );
    }

    updateByConversation(conversationId: Conversation['conversationId']) {
        this.updateBy$.next({
            type: 'updateConversation',
            conversationId,
        } as UpdateConversationParams);
    }

    updateByFiles(
        fileIds: string[],
        fileModificationType: FileModification.FileModificationTypeEnum = FileModification.FileModificationTypeEnum
            .FileCreated
    ) {
        this.updateBy$.next({
            type: 'updateFiles',
            fileIds,
            fileModificationType,
        } as UpdateFilesParams);
    }
}
