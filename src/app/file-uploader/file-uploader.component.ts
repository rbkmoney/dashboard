import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

import { FileUploaderService } from './file-uploader.service';

@Component({
    selector: 'dsh-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.scss']
})
export class FileUploaderComponent {
    @Output()
    filesUploaded = new EventEmitter<string[]>();

    @HostBinding('class.dsh-file-uploader-container')
    isDragover = false;

    startUploading$ = this.fileUploaderService.startUploading$;
    isUploading$ = this.fileUploaderService.isUploading$;

    constructor(private fileUploaderService: FileUploaderService) {
        this.fileUploaderService.filesUploaded$.subscribe(value => this.filesUploaded.emit(value));
    }

    setDragover(value: boolean) {
        this.isDragover = value;
    }

    startUploading(files: File[]) {
        this.startUploading$.next(files);
    }
}
