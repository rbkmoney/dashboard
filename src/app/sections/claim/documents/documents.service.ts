import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';

import { takeFileModificationsUnit } from '../../../api/claims/operators';
import { FilesService } from '../../../api/files';
import { ReceiveClaimService } from '../receive-claim.service';

@Injectable()
export class DocumentsService {
    claim$ = this.receiveClaimService.claim$.pipe(
        takeFileModificationsUnit,
        filter(value => !!value),
        switchMap(modifications =>
            modifications.length > 0
                ? forkJoin(modifications.map(modification => this.filesService.getFileInfo(modification.fileId)))
                : of([])
        ),
        shareReplay(1)
    );

    constructor(private receiveClaimService: ReceiveClaimService, private filesService: FilesService) {}
}
