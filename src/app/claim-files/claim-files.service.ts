import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { Claim, Modification } from '../api-codegen/claim-management/swagger-codegen';
import { FileData } from '../api-codegen/dark-api/swagger-codegen';
import { ClaimsService, createFileModificationUnit, takeFileModificationsUnit } from '../api/claims';
import { FilesService } from '../api/files';
import { concatFirstScan, progress } from '../custom-operators';

@Injectable()
export class ClaimFilesService {
    updateClaim$ = new Subject<string[]>();

    filesData$: Observable<FileData[]>;

    hasFiles$: Observable<boolean>;

    isLoading$: Observable<boolean>;

    constructor(
        private claimService: ClaimsService,
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    initialize(claim$: Observable<Claim>) {
        const initialIds$ = claim$.pipe(
            takeFileModificationsUnit,
            map(units => units.map(unit => unit.fileId)),
            shareReplay(1)
        );
        const filesIds$ = this.updateClaim$.pipe(
            concatFirstScan(
                (accIds, ids) =>
                    claim$.pipe(
                        switchMap(({ id }) => this.claimService.getClaimByID(id)),
                        switchMap(({ id, revision }) =>
                            this.claimService.updateClaimByID(id, revision, this.fileIdsToFileModifications(ids))
                        ),
                        map(() => [...accIds, ...ids])
                    ),
                initialIds$
            ),
            shareReplay(1)
        );
        this.filesData$ = filesIds$.pipe(
            switchMap(ids => this.getFilesInfo(ids)),
            tap(files => files.includes(null) && this.snackBar.open(this.transloco.translate('commonError'), 'OK')),
            map(files => files.filter(i => !!i)),
            shareReplay(1)
        );
        this.hasFiles$ = this.filesData$.pipe(
            map(data => data && data.length > 0),
            shareReplay(1)
        );
        const isClaimUpdating$ = progress(this.updateClaim$, filesIds$).pipe(shareReplay(1));
        const isFilesLoading$ = progress(filesIds$, this.filesData$).pipe(shareReplay(1));
        this.isLoading$ = merge(isClaimUpdating$, isFilesLoading$);
        merge(filesIds$, this.filesData$).subscribe({
            error: () => this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        });
        this.hasFiles$.subscribe();
        this.isLoading$.subscribe();
    }

    updateClaim(newFileIds: string[]) {
        this.updateClaim$.next(newFileIds);
    }

    private fileIdsToFileModifications(fileIds: string[]): Modification[] {
        return fileIds.map(id => createFileModificationUnit(id));
    }

    private getFilesInfo(ids: string[]): Observable<FileData[]> {
        return forkJoin(ids.map(id => this.filesService.getFileInfo(id).pipe(catchError(() => of(null)))));
    }
}
