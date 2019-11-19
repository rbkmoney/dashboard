import { Component, HostBinding } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { FilesService } from '../api';

@Component({
    selector: 'dsh-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.scss']
})
export class FileUploaderComponent {
    @HostBinding('class.dsh-file-uploader-container')
    isDragover = false;

    files = [];

    isUploading$ = new BehaviorSubject<boolean>(false);

    constructor(private filesService: FilesService) {}

    uploadFiles(files: File[]) {
        this.isUploading$.next(true);
        this.filesService.uploadFiles(files).subscribe(uploadedFiles => {
            console.log(uploadedFiles);
            this.isUploading$.next(false);
        });
        this.files = [];
    }

    setDragover(value: boolean) {
        console.log(value);
        this.isDragover = value;
    }
}
