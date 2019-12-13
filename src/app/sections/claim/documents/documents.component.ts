import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

import { DocumentsService } from './documents.service';
import { ReceiveClaimService } from '../receive-claim.service';

@Component({
    selector: 'dsh-documents',
    templateUrl: 'documents.component.html',
    providers: [DocumentsService]
})
export class DocumentsComponent {
    claim$ = this.receiveClaimService.claim$.pipe(tap(r => console.log(r)));

    constructor(private receiveClaimService: ReceiveClaimService) {}
}
