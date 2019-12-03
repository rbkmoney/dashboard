import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';

import { takeFileModificationsUnit } from '../../../api/claims/operators';
import { FilesService } from '../../../api/files';
import { FileData } from '../../../api-codegen/dark-api/swagger-codegen';
import { ReceiveClaimService } from '../receive-claim.service';

@Injectable()
export class DocumentsService {
    docs$: Observable<FileData[]> = this.receiveClaimService.claim$.pipe(
        takeFileModificationsUnit,
        filter(value => !!value),
        switchMap(modifications =>
            modifications.length > 0
                ? forkJoin(
                      modifications.map(modification =>
                          this.filesService.getFileInfo(modification.id)
                      )
                  )
                : of([])
        ),
        shareReplay(1)
    );

    constructor(private receiveClaimService: ReceiveClaimService, private filesService: FilesService) {}
}
