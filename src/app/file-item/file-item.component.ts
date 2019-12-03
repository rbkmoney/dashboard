import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { FileData } from '../api-codegen/dark-api/swagger-codegen';
import { download } from '../../utils';
import { FilesService } from '../api/files';

@Component({
    selector: 'dsh-file-item',
    templateUrl: 'file-item.component.html',
    styleUrls: ['file-item.component.scss']
})
export class FileItemComponent {
    @Input() file: FileData;

    constructor(
        private filesService: FilesService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    downloadFile() {
        this.filesService.downloadFile(this.file.fileId).subscribe(
            ({ url }) => {
                download(url);
            },
            () => this.snackBar.open(this.transloco.translate('commonError'), 'OK')
        );
    }
}
