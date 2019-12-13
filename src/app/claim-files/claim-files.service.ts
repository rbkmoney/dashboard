import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { FileModificationUnit, Modification } from '../api-codegen/claim-management/swagger-codegen';
import { ClaimsService, createFileModificationUnit, takeFileModificationsUnit } from '../api/claims';
import { takeError } from '../custom-operators';

interface UpdateClaimData {
    claimID: number;
    ids: string[];
}

@Injectable()
export class ClaimFilesService {
    private receiveClaim$ = new Subject<number>();

    private uploadedFilesIds$ = new Subject<UpdateClaimData>();

    claim$ = this.receiveClaim$.pipe(
        switchMap(claimID => this.claimService.getClaimByID(claimID)),
        shareReplay(1)
    );

    claimError$ = this.claim$.pipe(takeError);

    modifications$: Observable<FileModificationUnit[]> = this.claim$.pipe(takeFileModificationsUnit);

    hasFiles$ = this.modifications$.pipe(map(v => !!v.length));

    private claimUpdate$ = this.uploadedFilesIds$.pipe(
        switchMap(({ claimID, ids }) =>
            this.claimService.getClaimByID(claimID).pipe(
                switchMap(({ id, revision }) =>
                    forkJoin(
                        of(id),
                        this.claimService.updateClaimByID(id, revision, this.fileIdsToFileModifications(ids))
                    )
                ),
                map(([id]) => id)
            )
        )
    );

    constructor(
        private claimService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.modifications$.subscribe();
        this.claimUpdate$.subscribe(
            id => this.receiveClaim(id),
            () => this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        );
        this.claimError$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    receiveClaim(id: number) {
        this.receiveClaim$.next(id);
    }

    updateClaim(claimID: number, ids: string[]) {
        this.uploadedFilesIds$.next({ claimID, ids });
    }

    private fileIdsToFileModifications(fileIds: string[]): Modification[] {
        return fileIds.map(id => createFileModificationUnit(id));
    }
}
