import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
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

    private fileDownload$: Observable<void>;

    private error$ = this.fileDownload$.pipe(takeError);

    constructor(
        private fileItemService: FileItemService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.error$.subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }

    downloadFile() {
        this.fileDownload$ = this.fileItemService.downloadFile(this.file.fileId);
    }
}
