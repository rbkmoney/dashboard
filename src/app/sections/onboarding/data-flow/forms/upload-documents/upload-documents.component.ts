import { Component } from '@angular/core';

import { FileModificationUnit } from '../../../../../api-codegen/claim-management/swagger-codegen';
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

    deleteFile(unit: FileModificationUnit) {
        this.documentsService.deleteFile(unit);
    }
}
