import { Component } from '@angular/core';

import { DocumentsService } from './documents.service';

@Component({
    selector: 'dsh-documents',
    templateUrl: 'documents.component.html',
    providers: [DocumentsService]
})
export class DocumentsComponent {
    claim$ = this.documentsService.claim$;

    constructor(private documentsService: DocumentsService) {}
}
