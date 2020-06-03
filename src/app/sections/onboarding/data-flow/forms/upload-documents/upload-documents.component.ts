import { Component } from '@angular/core';

import { UploadDocumentsService } from './upload-documents.service';

@Component({
    selector: 'dsh-upload-documents',
    templateUrl: 'upload-documents.component.html',
})
export class UploadDocumentsComponent {
    fileUnits$ = this.documentsService.fileUnits$;

    constructor(private documentsService: UploadDocumentsService) {}

    filesUploaded(fileIds: string[]) {
        this.documentsService.filesUploaded(fileIds);
    }
}
