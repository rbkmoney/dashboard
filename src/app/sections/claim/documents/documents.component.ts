import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { DocumentsService } from './documents.service';

@Component({
    selector: 'dsh-documents',
    templateUrl: 'documents.component.html',
    styleUrls: ['documents.component.scss'],
    providers: [DocumentsService]
})
export class DocumentsComponent {
    claim$ = this.documentsService.claim$;
    updateClaim$ = new Subject<string[]>();

    constructor(private documentsService: DocumentsService) {}

    updateClaim(ids: string[]) {
        this.updateClaim$.next(ids);
    }
}
