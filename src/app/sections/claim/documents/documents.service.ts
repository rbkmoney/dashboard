import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReceiveClaimService } from '../receive-claim.service';
import { UpdateClaimService } from '../update-claim';
import { FileModificationUnit } from '../../../api-codegen/claim-management';
import { takeFileModificationsUnit } from '../../../api';

@Injectable()
export class DocumentsService {
    fileUnits$: Observable<FileModificationUnit[]> = this.receiveClaimService.claim$.pipe(takeFileModificationsUnit);

    isQuestionaryClaim$: Observable<boolean> = this.receiveClaimService.claimType$.pipe(map(t => t === 'questionary'));

    constructor(private receiveClaimService: ReceiveClaimService, private updateClaimService: UpdateClaimService) {}

    filesUploaded(fileIds: string[]) {
        this.updateClaimService.updateByFiles(fileIds);
    }
}
