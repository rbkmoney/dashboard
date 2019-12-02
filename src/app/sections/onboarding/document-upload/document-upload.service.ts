import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { filter, first, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { booleanDelay, takeError } from '../../../custom-operators';
import { ClaimsService, FilesService, takeFileModificationsUnit } from '../../../api';
import { FileData } from '../../../api-codegen/dark-api/swagger-codegen';
import { Claim, Modification } from '../../../api-codegen/claim-management/swagger-codegen';
import { createFileModificationUnit } from '../../../api/claims/utils';
import { progress } from '../../partial-fetcher/progress';

@Injectable()
export class DocumentUploadService {
    claim$: Observable<Claim> = this.route.params.pipe(
        switchMap(({ claimID }) => this.claimService.getClaimByID(claimID)),
        shareReplay(1)
    );

    private filesIds$ = new BehaviorSubject<string[]>([]);

    hasFiles$: Observable<boolean> = this.filesIds$.pipe(
        map(modifications => modifications.length > 0),
        shareReplay(1)
    );

    filesData$: Observable<FileData[]> = this.filesIds$.pipe(
        switchMap(ids => this.getFilesInfo(ids)),
        shareReplay(1)
    );

    isLoading$ = progress(this.filesIds$, this.filesData$).pipe(
        startWith(false),
        booleanDelay(),
        shareReplay(1)
    );

    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimsService,
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.claim$
            .pipe(
                takeFileModificationsUnit,
                filter(value => !!value),
                map(units => units.map(unit => unit.id))
            )
            .subscribe(ids => this.filesIds$.next(ids));
        this.filesData$
            .pipe(
                takeError,
                shareReplay(1)
            )
            .subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    updateClaim(uploadedFilesIds: string[]): void {
        this.filesIds$.next([...this.filesIds$.value, ...uploadedFilesIds]);
        this.claim$
            .pipe(
                first(),
                switchMap(({ id, revision, changeset }) => {
                    const lastModificationId = changeset[changeset.length - 1].modificationID || 1;
                    return this.claimService.updateClaimByID(
                        id,
                        revision,
                        this.fileIdsToFileModifications(uploadedFilesIds, lastModificationId)
                    );
                })
            )
            .subscribe(() => true, () => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    private fileIdsToFileModifications(fileIds: string[], lastId: number): Modification[] {
        return fileIds.map((id, index) => createFileModificationUnit(lastId + index + 1, id).modification);
    }

    private getFilesInfo(ids: string[]): Observable<FileData[]> {
        return ids.length ? forkJoin(ids.map(id => this.filesService.getFileInfo(id))) : of([]);
    }
}
