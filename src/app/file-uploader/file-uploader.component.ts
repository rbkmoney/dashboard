import { Component, HostBinding, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { first } from 'rxjs/operators';

import { FileUploaderService } from './file-uploader.service';
import { takeError } from '../custom-operators';

@Component({
    selector: 'dsh-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.scss'],
    providers: [FileUploaderService]
})
export class FileUploaderComponent {
    @Output()
    uploadedFilesIds$ = this.fileUploaderService.uploadedFilesIds$;

    @HostBinding('class.dsh-file-uploader-container')
    isDragover = false;

    isUploading$ = this.fileUploaderService.isUploading$;

    files = [];

    constructor(
        private fileUploaderService: FileUploaderService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    uploadFiles(files: File[]) {
        this.fileUploaderService
            .uploadFiles(files)
            .pipe(
                first(),
                takeError
            )
            .subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
        this.files = [];
    }

    setDragover(value: boolean) {
        this.isDragover = value;
    }
}
