import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FileUploaderService } from './file-uploader.service';

@Component({
    selector: 'dsh-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.scss'],
    providers: [FileUploaderService]
})
export class FileUploaderComponent {

    @Output()
    uploadedFilesIds = new EventEmitter<string[]>();

    @HostBinding('class.dsh-file-uploader-container')
    isDragover = false;

    isUploading$ = new BehaviorSubject<boolean>(false);

    files = [];

    constructor(private fileUploaderService: FileUploaderService) {}

    uploadFiles(files: File[]) {
        this.isUploading$.next(true);
        this.fileUploaderService.uploadFiles(files).subscribe(uploadedFiles => {
            this.isUploading$.next(false);
            this.uploadedFilesIds.emit(uploadedFiles);
        });
        this.files = [];
    }

    setDragover(value: boolean) {
        this.isDragover = value;
    }
}
