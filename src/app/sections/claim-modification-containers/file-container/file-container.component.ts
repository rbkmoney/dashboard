import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { coerceBoolean } from '../../../../utils';
import { FileModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';
import { FileContainerService } from './file-container.service';

@Component({
    selector: 'dsh-file-container',
    templateUrl: 'file-container.component.html',
    styleUrls: ['file-container.component.scss'],
    providers: [FileContainerService],
})
export class FileContainerComponent implements OnChanges {
    @Input() unit: FileModificationUnit;
    @Input() @coerceBoolean deletion = false;
    @Output() delete = new EventEmitter<FileModificationUnit>();

    fileInfo$ = this.fileContainerService.fileInfo$;
    isLoading$ = this.fileContainerService.isLoading$;
    error$ = this.fileContainerService.error$;

    constructor(private fileContainerService: FileContainerService) {}

    ngOnChanges({ unit }: SimpleChanges) {
        if (unit.firstChange || unit.currentValue.fileId !== unit.previousValue.fileId) {
            this.fileContainerService.getFileInfo(unit.currentValue.fileId);
        }
    }

    download() {
        this.fileContainerService.downloadFile(this.unit.fileId);
    }
}
