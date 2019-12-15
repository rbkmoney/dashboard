import { Component } from '@angular/core';

import { DocumentsService } from './documents.service';
import { ReceiveClaimService } from '../receive-claim.service';

@Component({
    selector: 'dsh-documents',
    templateUrl: 'documents.component.html',
    providers: [DocumentsService]
})
export class DocumentsComponent {
    claim$ = this.receiveClaimService.claim$;

    constructor(private receiveClaimService: ReceiveClaimService) {}
}
