import { Component, Input, Inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';

import { FileMeta } from '../../../api-codegen/anapi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';
import { SpinnerType } from '../../../spinner';
import { download } from '../../../../utils/download';
import { ReportsService } from '../../../api/reports';

@Component({
    selector: 'dsh-files',
    templateUrl: 'files.component.html',
    styleUrls: ['files.component.scss']
})
export class FilesComponent {
    @Input() files: FileMeta[];
    @Input() reportID: number;

    isLoading$: Subject<boolean> = new Subject();
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private filesService: ReportsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    downloadFile(fileID: string) {
        this.isLoading$.next(true);
        this.filesService
            .downloadFile(this.reportID, fileID)
            .pipe(
                catchError(() => {
                    this.isLoading$.next(false);
                    this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                    return [];
                })
            )
            .subscribe(fileLink => {
                this.isLoading$.next(false);
                download(fileLink.url);
            });
    }
}
