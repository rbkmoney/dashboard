import { Component, HostBinding } from '@angular/core';

import { FileService } from '../api';

@Component({
    selector: 'dsh-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.scss']
})
export class FileUploaderComponent {
    @HostBinding('class.dsh-file-uploader-container')
    isDragover = false;

    files = [];

    constructor(private fileService: FileService) {}

    uploadFiles(files: File[]) {
        console.log(files);
        files.forEach((file) => {
            this.fileService.uploadFile(file).subscribe((uploadedFile) => {
                console.log(uploadedFile);
            });
        });
        this.files = [];
    }

    setDragover(value: boolean) {
        console.log(value);
        this.isDragover = value;
    }
}
