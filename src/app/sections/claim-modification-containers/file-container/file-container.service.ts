import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { FileData } from '@dsh/api-codegen/dark-api';
import { FilesService } from '@dsh/api/files';

import { download } from '../../../../utils';
import { booleanDelay, takeError } from '../../../custom-operators';

@Injectable()
export class FileContainerService {
    private getFileInfo$ = new Subject<string>();

    fileInfo$: Observable<FileData> = this.getFileInfo$.pipe(
        switchMap((fileID) => this.filesService.getFileInfo(fileID)),
        shareReplay(1)
    );

    isLoading$ = this.fileInfo$.pipe(booleanDelay(), shareReplay(1));

    error$ = this.fileInfo$.pipe(takeError, shareReplay(1));

    constructor(
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.fileInfo$.subscribe();
    }

    getFileInfo(fileID: string) {
        this.getFileInfo$.next(fileID);
    }

    downloadFile(fileID: string) {
        this.filesService.downloadFile(fileID).subscribe(
            ({ url }) => download(url),
            () => this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        );
    }
}
