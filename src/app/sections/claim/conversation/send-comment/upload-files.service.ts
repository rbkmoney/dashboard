import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { progress } from '@rbkmoney/utils';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { map, share, shareReplay, switchMap } from 'rxjs/operators';

import { FilesService } from '@dsh/api/files';

import { filterError, filterPayload, replaceError } from '../../../../custom-operators';
import { UpdateClaimService } from '../../update-claim';

@Injectable()
export class UploadFilesService {
    private uploadFiles$ = new Subject<File[]>();

    uploadedFiles$: Observable<string[]>;
    errors$: Observable<any>;
    isUploading$: Observable<boolean>;

    constructor(
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private updateClaimService: UpdateClaimService
    ) {
        const uploadFilesWithError$ = this.uploadFiles$.pipe(
            switchMap((files) => this.filesService.uploadFiles(files).pipe(replaceError)),
            share()
        );
        this.uploadedFiles$ = uploadFilesWithError$.pipe(filterPayload, shareReplay(1));
        this.errors$ = uploadFilesWithError$.pipe(filterError, shareReplay(1));
        const isUploading$ = progress(this.uploadFiles$, merge(this.uploadedFiles$, this.errors$));
        this.isUploading$ = combineLatest([isUploading$, this.updateClaimService.inProgress$]).pipe(
            map((v) => v.includes(true)),
            shareReplay(1)
        );

        this.errors$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
        this.uploadedFiles$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('conversation.filesUploaded', null, 'claim'), 'OK', {
                duration: 5000,
            })
        );
        this.uploadedFiles$.subscribe((fileIds) => this.updateClaimService.updateByFiles(fileIds));
    }

    uploadFiles(files: File[]) {
        this.uploadFiles$.next(files);
    }
}
