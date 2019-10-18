import { Component, Input, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Report } from '../../../../../api-codegen/anapi';
import { downloadAll } from '../../../../../../utils';
import { ReportsService } from '../../../../../api';
import { DropdownTriggerDirective } from '../../../../../dropdown';

@Component({
    selector: 'dsh-actions',
    templateUrl: 'actions.component.html'
})
export class ActionsComponent {
    @Input() report: Report;
    @ViewChild(DropdownTriggerDirective, { static: false }) trigger: DropdownTriggerDirective;

    constructor(private reportsService: ReportsService) {}

    downloadReports() {
        this.trigger.close();
        forkJoin(this.report.files.map(file => this.reportsService.downloadFile(this.report.id, file.id)))
            .pipe(map(links => links.map(({ url }) => url)))
            .subscribe(urls => downloadAll(urls));
    }
}
