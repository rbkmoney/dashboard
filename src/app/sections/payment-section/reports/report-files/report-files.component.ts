import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

import { FileMeta } from '../../../../api-codegen/anapi';
import { ReportFilesService } from './report-files.service';

@Component({
    selector: 'dsh-report-files',
    templateUrl: 'report-files.component.html',
    providers: [ReportFilesService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportFilesComponent implements OnInit {
    @Input() reportID: number;
    @Input() files: FileMeta[];

    isLoading$: Observable<boolean> = this.reportFilesService.isLoading$;

    constructor(
        private reportFilesService: ReportFilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit() {
        this.reportFilesService.errorOccurred$.subscribe(() =>
            this.snackBar.open(this.transloco.translate('errors.downloadReportError', null, 'reports'), 'OK', {
                duration: 2000,
            })
        );
    }

    downloadAll() {
        this.reportFilesService.download(
            this.reportID,
            this.files.map((file) => file.id)
        );
    }
}
