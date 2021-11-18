import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

import { FileModificationUnit } from '@dsh/api-codegen/claim-management/swagger-codegen';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';
import { coerceBoolean } from '@dsh/utils';

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

    ngOnChanges({ unit }: SimpleChanges): void {
        if (unit.firstChange || unit.currentValue.fileId !== unit.previousValue.fileId) {
            this.fileContainerService.getFileInfo(unit.currentValue.fileId);
        }
    }

    download(): void {
        this.fileContainerService.downloadFile(this.unit.fileId);
    }

    deleteByCondition(): void {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(filter((r) => r === 'confirm'))
            .subscribe(() => {
                this.delete.emit(this.unit);
            });
    }
}
