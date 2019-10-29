import { Component, Input, Inject } from '@angular/core';

import { FileMeta } from '../../../api-codegen/anapi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';
import { ReportService } from '../report.service';

@Component({
    selector: 'dsh-files',
    templateUrl: 'files.component.html',
    styleUrls: ['files.component.scss']
})
export class FilesComponent {
    @Input() files: FileMeta[];
    @Input() reportID: number;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private reportService: ReportService) {}

    downloadFile(id: string) {
        this.reportService.downloadReport(this.reportID, id).subscribe();
    }
}
