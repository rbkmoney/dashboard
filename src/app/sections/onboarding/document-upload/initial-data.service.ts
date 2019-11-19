import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { first, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { booleanDelay, handleNull, takeError } from '../../../custom-operators';
import { ClaimsService, FilesService, takeFileModificationsUnit } from '../../../api';
import { FileData } from '../../../api-codegen/dark-api/swagger-codegen';

@Injectable()
export class InitialDataService {
    claimID: number;

    private initialize$: Subject<number> = new Subject();

    initialFiles$: Observable<FileData[]> = this.initialize$.pipe(
        first(),
        tap(claimID => (this.claimID = claimID)),
        switchMap(claimID => this.claimService.getClaimByID(claimID)),
        takeFileModificationsUnit,
        handleNull('Modification unit is null'),
        switchMap(modifications =>
            modifications.length > 0
                ? forkJoin(
                      modifications.map(modification =>
                          this.filesService.getFileInfo(modification.modification.claimModificationType.id)
                      )
                  )
                : of([])
        ),
        shareReplay(1)
    );
    initialized$: Observable<boolean> = this.initialFiles$.pipe(
        booleanDelay(),
        map(r => !r)
    );
    initializeError$: Observable<any> = this.initialFiles$.pipe(
        takeError,
        shareReplay(1)
    );

    constructor(
        private claimService: ClaimsService,
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.initializeError$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    initialize(claimID: number) {
        this.initialize$.next(claimID);
    }
}
