import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

import { ReportsService } from '../../../api/reports';

@Injectable()
export class FilesService {
    isLoading$ = new Subject<boolean>();

    constructor(
        private reportSearchService: ReportsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    downloadReport(fileID: string, reportID: number) {
        this.isLoading$.next(true);
        this.reportSearchService.downloadFile(reportID, fileID).subscribe(
            fileLink => {
                console.log(fileLink.url);
                // TODO: download file logic from another PR
                // this.isLoading$.next(false);
            },
            _ => {
                this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                this.isLoading$.next(false);
            }
        );
    }
}
