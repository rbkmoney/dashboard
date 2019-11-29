import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, forkJoin, merge, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { takeError } from '../../../custom-operators';
import { ClaimsService, FilesService, takeFileModificationsUnit } from '../../../api';
import { FileData, FileModificationUnit } from '../../../api-codegen/dark-api/swagger-codegen';
import { Claim, Modification } from '../../../api-codegen/claim-management/swagger-codegen';
import { createFileModificationUnit } from '../../../api/claims/utils/create-file-modification-unit';

@Injectable()
export class DocumentUploadService {
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

    private initialFilesIds$: Observable<string[]> = this.fileModificationUnits$.pipe(
        filter(value => !!value),
        map(units => units.map(unit => unit.id)),
        shareReplay(1)
    );

    private fileIds$ = new BehaviorSubject<string[]>([]);

    filesData$ = merge(this.fileIds$, this.initialFilesIds$).pipe(map(ids => this.getFilesInfo(ids)));

    private fileModificationsError$: Observable<any> = this.fileModificationUnits$.pipe(takeError);

    private filesDataError$: Observable<any> = this.filesData$.pipe(takeError);

    errors$: Observable<any> = merge(this.filesDataError$, this.fileModificationsError$).pipe(shareReplay(1));

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
        return this.claim$.pipe(
            switchMap(({ id, revision, changeset }) => {
                const lastId = changeset[changeset.length - 1].modificationID || 1;
                return this.claimService.updateClaimByID(
                    id,
                    revision,
                    this.fileIdsToFileModifications(uploadedFiles, lastId)
                );
            }),
            map(filesIds => this.fileIds$.next([...this.fileIds$.value, ...filesIds]))
        );
    }

    private fileIdsToFileModifications(fileIds: string[], lastId: number): Modification[] {
        return fileIds.map((id, index) => createFileModificationUnit(lastId + index + 1, id).modification);
    }

    private getFilesInfo(ids: string[]): Observable<FileData[]> {
        return forkJoin(ids.map(id => this.filesService.getFileInfo(id)));
    }
}
