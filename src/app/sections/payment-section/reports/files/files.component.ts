import { Component, Inject, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { forkJoin, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SpinnerType } from '@dsh/components/indicators';

import { download, multipleDownload } from '../../../../../utils';
import { FileMeta } from '../../../../api-codegen/anapi/swagger-codegen';
import { ReportLink } from '../../../../api-codegen/capi/swagger-codegen';
import { ReportsService } from '../../../../api/reports';
import { LAYOUT_GAP } from '../../../constants';

@Component({
    selector: 'dsh-files',
    templateUrl: 'files.component.html',
    styleUrls: ['files.component.scss']
})
export class FilesComponent {
    @Input() files: FileMeta[];
    @Input() reportID: number;

    isLoading = false;
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private filesService: ReportsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    getDownloadLink(fileID: string): Observable<ReportLink> {
        return this.filesService.downloadFile(this.reportID, fileID).pipe(
            catchError(() => {
                this.isLoading = false;
                this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                return [];
            })
        );
    }

    downloadFile(fileID: string) {
        this.isLoading = true;
        this.getDownloadLink(fileID).subscribe(fileLink => {
            this.isLoading = false;
            download(fileLink.url);
        });
    }

    downloadAll() {
        this.isLoading = true;
        forkJoin(this.files.map(file => this.getDownloadLink(file.id)))
            .pipe(map(links => links.map(link => link.url)))
            .subscribe(urls => {
                this.isLoading = false;
                multipleDownload(urls);
            });
    }
}
