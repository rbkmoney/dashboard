import { Component, Input } from '@angular/core';

import { FileData } from '../api-codegen/dark-api/swagger-codegen';

@Component({
    selector: 'dsh-file-item',
    templateUrl: 'file-item.component.html',
    styleUrls: ['file-item.component.scss']
})
export class FileItemComponent {
    @Input() file: FileData;
}
