import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
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

    isUploading$ = progress(this.startUploading$, this.uploadedFilesIds$);

    constructor(
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.startUploading$
            .pipe(switchMap(files => this.filesService.uploadFiles(files)))
            .subscribe(
                value => this.uploadedFilesIds$.emit(value),
                () => this.snackBar.open(this.transloco.translate('commonError'), 'OK')
            );
    }

    setDragover(value: boolean) {
        this.isDragover = value;
    }
}
