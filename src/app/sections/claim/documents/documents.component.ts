import { Component } from '@angular/core';

import { DocumentsService } from './documents.service';

@Component({
    selector: 'dsh-documents',
    templateUrl: 'documents.component.html',
    providers: [DocumentsService],
})
export class DocumentsComponent {
    fileUnits$ = this.documentsService.fileUnits$;
    isQuestionaryClaim$ = this.documentsService.isQuestionaryClaim$;

    constructor(private documentsService: DocumentsService) {}

    filesUploaded(fileIds: string[]) {
        this.documentsService.filesUploaded(fileIds);
    }
}
