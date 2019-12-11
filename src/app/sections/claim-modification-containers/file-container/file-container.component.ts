import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { FileModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';
import { FileContainerService } from './file-container.service';

@Component({
    selector: 'dsh-file-container',
    templateUrl: 'file-container.component.html',
    styleUrls: ['file-container.component.scss'],
    providers: [FileContainerService]
})
export class FileContainerComponent implements OnChanges {
    @Input() fileModification: FileModificationUnit;

    fileInfo$ = this.fileContainerService.fileInfo$;
    isLoading$ = this.fileContainerService.isLoading$;
    isError$ = this.fileContainerService.isError$;

    constructor(private fileContainerService: FileContainerService) {}

    ngOnChanges({ fileModification }: SimpleChanges) {
        this.fileContainerService.getFileInfo(fileModification.currentValue.fileId);
    }

    downloadFile(fileID: string) {
        this.fileContainerService.downloadFile(fileID);
    }
}
