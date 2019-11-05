import { Component, Input, Inject } from '@angular/core';

import { FileMeta } from '../../../api-codegen/anapi/swagger-codegen';
import { LAYOUT_GAP } from '../../constants';
import { FilesService } from './files.service';
import { SpinnerType } from '../../../spinner';

@Component({
    selector: 'dsh-files',
    templateUrl: 'files.component.html',
    styleUrls: ['files.component.scss'],
    providers: [FilesService]
})
export class FilesComponent {
    @Input() files: FileMeta[];
    @Input() reportID: number;

    isLoading$ = this.filesService.isLoading$;
    downloadableFile$ = this.filesService.downloadableFile$;
    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private filesService: FilesService) {}

    downloadFile(fileID: string) {
        this.filesService.downloadReport(fileID, this.reportID);
    }

    downloadAll() {
        this.filesService.downloadAll();
    }
}
