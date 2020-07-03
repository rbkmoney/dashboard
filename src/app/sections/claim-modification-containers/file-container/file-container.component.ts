import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

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

    constructor(private fileContainerService: FileContainerService, private dialog: MatDialog) {}

    ngOnChanges({ unit }: SimpleChanges) {
        if (unit.firstChange || unit.currentValue.fileId !== unit.previousValue.fileId) {
            this.fileContainerService.getFileInfo(unit.currentValue.fileId);
        }
    }

    download() {
        this.fileContainerService.downloadFile(this.unit.fileId);
    }

    deleteByCondition() {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(filter((r) => r === 'confirm'))
            .subscribe(() => {
                this.delete.emit(this.unit);
            });
    }
}
