import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { forkJoin, merge, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { takeError } from '../../../custom-operators';
import { ClaimsService, FilesService, takeFileModificationsUnit } from '../../../api';
import { FileData, FileModificationUnit } from '../../../api-codegen/dark-api/swagger-codegen';

@Injectable()
export class DocumentUploadService {

    private fileModificationUnits$: Observable<FileModificationUnit[] | null> = this.route.params.pipe(
        switchMap(({ claimID }) => this.claimService.getClaimByID(claimID)),
        takeFileModificationsUnit,
        shareReplay(1)
    );

    hasFiles$: Observable<boolean> = this.fileModificationUnits$.pipe(
        map(modifications => !!modifications),
        shareReplay(1)
    );

    files$: Observable<FileData[]> = this.fileModificationUnits$.pipe(
        filter(value => !!value),
        map(units => units.map((unit) => unit.id)),
        switchMap(ids => forkJoin(ids.map((id) => this.filesService.getFileInfo(id)))),
        shareReplay(1)
    );

    private fileModificationsError$: Observable<any> = this.fileModificationUnits$.pipe(takeError);

    private filesError$: Observable<any> = this.files$.pipe(takeError);

    errors$: Observable<any> = merge(this.filesError$, this.fileModificationsError$).pipe(shareReplay(1));

    constructor(
        private route: ActivatedRoute,
        private claimService: ClaimsService,
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.errors$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

}
