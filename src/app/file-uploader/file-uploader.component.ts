import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'dsh-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.scss']
})
export class FileUploaderComponent {
    @HostBinding('class.dsh-file-uploader-container')
    isDragover = false;

    files = [];

    showFiles() {
        console.log(this.files);
    }

    setDragover(value: boolean) {
        console.log(value);
        this.isDragover = value;
    }
}
