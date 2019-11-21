import { Component } from '@angular/core';

import { DocumentsService } from './documents.service';

@Component({
    selector: 'dsh-documents',
    templateUrl: 'documents.component.html',
    styleUrls: ['documents.component.scss'],
    providers: [DocumentsService]
})
export class DocumentsComponent {
    docs$ = this.documentsService.docs$;

    constructor(private documentsService: DocumentsService) {}
}
