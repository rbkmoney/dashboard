import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { concat, forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { booleanDebounceTime, concatFirstScan, progress } from '../../../custom-operators';
import { ClaimsService, FilesService, takeFileModificationsUnit } from '../../../api';
import { FileData } from '../../../api-codegen/dark-api/swagger-codegen';
import { Claim, Modification } from '../../../api-codegen/claim-management/swagger-codegen';
import { createFileModificationUnit } from '../../../api/claims/utils';

@Injectable()
export class DocumentUploadService {
    claim$: Observable<Claim> = this.route.params.pipe(
        switchMap(({ claimID }) => this.claimService.getClaimByID(claimID)),
        shareReplay(1)
    );

    hasFiles$: Observable<boolean>;

    filesData$: Observable<FileData[]>;

    updateClaim$ = new Subject<string[]>();

    isClaimUpdating$: Observable<boolean>;

    isFilesLoading$: Observable<boolean>;

    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimsService,
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        const initialIds$ = this.claim$.pipe(
            tap((e) => console.log('TAP', e)),
            first(),
            takeFileModificationsUnit,
            filter(value => !!value),
            map(units => units.map(unit => unit.fileId)),
            shareReplay(1)
        );
        const updatedFilesIds$ = this.updateClaim$.pipe(
            tap((e) => console.log('start', e)),
            concatFirstScan(
                (accIds, ids) => this.claim$.pipe(
                    tap((e) => console.log('R', e)),
                    switchMap(({ id, revision }) => {
                        return this.claimService.updateClaimByID(
                            id,
                            revision,
                            this.fileIdsToFileModifications(ids)
                        ).pipe(catchError(() => of([])));
                    }),
                    map(() => [...accIds, ...ids])
                ),
                initialIds$
            ),
            distinctUntilChanged(),
            shareReplay(1)
        );
        const filesIds$ = concat(initialIds$, updatedFilesIds$).pipe(shareReplay(1));
        filesIds$.subscribe({
            error: () => this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        });
        this.hasFiles$ = filesIds$.pipe(
            map(modifications => modifications.length > 0),
            shareReplay(1)
        );
        this.filesData$ = filesIds$.pipe(
            switchMap(ids => this.getFilesInfo(ids).pipe(catchError(() => of([])))),
            tap((kek) => console.log('FILES DAT TAP' , kek)),
            shareReplay(1)
        );
        this.isClaimUpdating$ = progress(this.updateClaim$, updatedFilesIds$).pipe(
            booleanDebounceTime(),
            shareReplay(1)
        );
        this.isFilesLoading$ = progress(filesIds$, this.filesData$).pipe(shareReplay(1));
        this.filesData$.subscribe({
            error: () => this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        });
        this.hasFiles$.subscribe();
        this.isFilesLoading$.subscribe();
        this.isClaimUpdating$.subscribe();
    }

    private fileIdsToFileModifications(fileIds: string[]): Modification[] {
        return fileIds.map(id => createFileModificationUnit(id));
    }

    private getFilesInfo(ids: string[]): Observable<FileData[]> {
        return ids.length ? forkJoin(ids.map(id => this.filesService.getFileInfo(id))).pipe(tap(x => console.log('forkJoin', x))) : of([]).pipe(tap(x => console.log('of', x)));
    }
}
