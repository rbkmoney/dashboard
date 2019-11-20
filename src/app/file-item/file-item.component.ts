import { Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';

import { FileData } from '../api-codegen/dark-api/swagger-codegen';
import { FileItemService } from './file-item.service';

@Component({
    selector: 'dsh-file-item',
    templateUrl: 'file-item.component.html',
    styleUrls: ['file-item.component.scss']
})
export class FileItemComponent {
    @Input() file: FileData;

    constructor(private fileItemService: FileItemService) {}

    downloadFile() {
        this.fileItemService
            .downloadFile(this.file.fileId)
            .pipe(take(1))
            .subscribe();
    }
}
