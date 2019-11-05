import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

import { ReportsService } from '../../../api/reports';

@Injectable()
export class FilesService {
    isLoading$ = new Subject<boolean>();
    downloadableFile$ = new Subject();

    constructor(
        private reportSearchService: ReportsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    downloadReport(fileID: string, reportID: number) {
        this.setLoadingState(true, fileID);
        this.reportSearchService.downloadFile(reportID, fileID).subscribe(
            () => {
                // TODO: download file logic from another
                // this.isLoading$.next(false);
            },
            _ => {
                this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                // this.setLoadingState(false);
            }
        );
    }

    downloadAll() {
        // TODO: download file logic from another
        this.setLoadingState(true);
    }

    private setLoadingState(isLoading: boolean, fileID?: string) {
        this.isLoading$.next(isLoading);
        this.downloadableFile$.next(fileID);
    }
}
