import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FileMeta } from '../../../../../api-codegen/anapi';
import { ReportFilesService } from '../report-files.service';

@Component({
    selector: 'dsh-report-file',
    templateUrl: 'report-file.component.html',
    styleUrls: ['report-file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportFileComponent {
    @Input() reportID: number;
    @Input() file: FileMeta;

    isLoading$ = this.reportFilesService.isLoading$;

    constructor(private reportFilesService: ReportFilesService) {}

    download(fileID: string) {
        this.reportFilesService.download(this.reportID, [fileID]);
    }
}
