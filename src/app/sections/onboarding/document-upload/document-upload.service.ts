import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, forkJoin, merge, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { takeError } from '../../../custom-operators';
import { ClaimsService, FilesService, takeFileModificationsUnit } from '../../../api';
import { FileData, FileModificationUnit } from '../../../api-codegen/dark-api/swagger-codegen';
import { Claim, Modification } from '../../../api-codegen/claim-management/swagger-codegen';
import { createFileModificationUnit } from '../../../api/claims/utils/create-file-modification-unit';

@Injectable()
export class DocumentUploadService {
    filesData$ = new BehaviorSubject<FileData[]>([{ fileName: 'kek.pdf', fileId: '308d8263-4fd8-4fa4-b502-801fe0c616d6' } as FileData]);

    claim$: Observable<Claim> = this.route.params.pipe(
        switchMap(({ claimID }) => this.claimService.getClaimByID(claimID)),
        shareReplay(1)
    );

    private fileModificationUnits$: Observable<FileModificationUnit[] | null> = this.claim$.pipe(
        takeFileModificationsUnit,
        shareReplay(1)
    );

    hasFiles$: Observable<boolean> = this.fileModificationUnits$.pipe(
        map(modifications => !!modifications),
        shareReplay(1)
    );

    private initialFilesInfo$: Observable<FileData[]> = this.fileModificationUnits$.pipe(
        filter(value => !!value),
        map(units => units.map((unit) => unit.id)),
        switchMap(ids => forkJoin(ids.map((id) => this.filesService.getFileInfo(id)))),
        tap((files) => this.filesData$.next(files)),
        shareReplay(1)
    );

    private fileModificationsError$: Observable<any> = this.fileModificationUnits$.pipe(takeError);

    private filesInfoError$: Observable<any> = this.initialFilesInfo$.pipe(takeError);

    errors$: Observable<any> = merge(this.filesInfoError$, this.fileModificationsError$).pipe(shareReplay(1));

    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimsService,
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.errors$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    updateClaim(uploadedFiles: string[]) {
        const updatedClaim$ = this.claim$.pipe(
            switchMap(({ id, revision, changeset }) => {
                const lastId = changeset[changeset.length - 1].modificationID;
                return this.claimService.updateClaimByID(id, revision, this.fileIdsToFileModifications(uploadedFiles, lastId))
            })
        );
        updatedClaim$.pipe(takeError).subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
        return updatedClaim$.pipe(
            map((files) => this.filesData$.next([...this.filesData$.value, ...files]))
        );
    }

    private fileIdsToFileModifications(fileIds: string[], lastId: number): Modification[] {
        return fileIds.map((id, index) =>
            createFileModificationUnit(lastId + index + 1, id).modification
        );
    }

}
