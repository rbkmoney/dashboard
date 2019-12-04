import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { merge, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { FilesService } from '../api/files';
import { progress } from '../custom-operators';

@Component({
    selector: 'dsh-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.scss']
})
export class FileUploaderComponent {
    @Output()
    uploadedFilesIds$ = new EventEmitter<string[]>();

    @HostBinding('class.dsh-file-uploader-container')
    isDragover = false;

    startUploading$ = new Subject<File[]>();

    private uploadingError$ = new Subject<null>();

    isUploading$ = progress(this.startUploading$, merge(this.uploadedFilesIds$, this.uploadingError$));

    constructor(
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.startUploading$.pipe(switchMap(files => this.filesService.uploadFiles(files))).subscribe(
            value => value.length && this.uploadedFilesIds$.emit(value),
            () => {
                this.uploadingError$.next(null);
                this.snackBar.open(this.transloco.translate('commonError'), 'OK');
            }
        );
        this.uploadingError$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    setDragover(value: boolean) {
        this.isDragover = value;
    }
}
