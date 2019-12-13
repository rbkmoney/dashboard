import { Injectable } from '@angular/core';

import { ReceiveClaimService } from '../receive-claim.service';

@Injectable()
export class DocumentsService {
    claim$ = this.receiveClaimService.claim$;

    constructor(private receiveClaimService: ReceiveClaimService) {}
}
