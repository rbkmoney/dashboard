import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { FileData } from '../api-codegen/dark-api/swagger-codegen';
import { FileItemService } from './file-item.service';
import { takeError } from '../custom-operators';

@Component({
    selector: 'dsh-file-item',
    templateUrl: 'file-item.component.html',
    styleUrls: ['file-item.component.scss']
})
export class FileItemComponent {
    @Input() file: FileData;

    constructor(
        private fileItemService: FileItemService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    downloadFile() {
        this.fileItemService
            .downloadFile(this.file.fileId)
            .pipe(takeError)
            .subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }
}
