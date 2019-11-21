import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';

import { ClaimService } from '../claim.service';
import { takeFileModificationsUnit } from '../../../api/claims/operators';
import { FilesService } from '../../../api/files';
import { FileData } from '../../../api-codegen/dark-api/swagger-codegen';

@Injectable()
export class DocumentsService {
    docs$: Observable<FileData[]> = this.claimService.claim$.pipe(
        tap(() => console.log('before takeFileModifications')),
        takeFileModificationsUnit,
        switchMap(modifications => modifications.length > 0
            ? forkJoin(
                modifications.map(modification =>
                    this.filesService.getFileInfo(modification.modification.claimModificationType.id)
                )
            )
            : of([])
        ),
        shareReplay(1)
    );

    constructor(private claimService: ClaimService, private filesService: FilesService) {}
}
