import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { merge, of, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';

import { FilesService } from '../../../app/api/files';
import { progress } from '../../../app/custom-operators';

@Injectable()
export class FileUploaderService {
    startUploading$ = new Subject<File[]>();

    filesUploadingError$ = new Subject<null>();

    filesUploaded$ = this.startUploading$.pipe(
        switchMap((files) =>
            this.filesService.uploadFiles(files).pipe(
                catchError(() => {
                    this.filesUploadingError$.next(null);
                    return of([]);
                })
            )
        ),
        filter((v) => !!v.length),
        shareReplay(1)
    );

    isUploading$ = progress(this.startUploading$, merge(this.filesUploaded$, this.filesUploadingError$));

    constructor(
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.filesUploadingError$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }
}
