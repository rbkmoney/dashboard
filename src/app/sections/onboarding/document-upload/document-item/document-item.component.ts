import { Component, Input } from '@angular/core';

import { FileData } from '../../../../api-codegen/dark-api/swagger-codegen';

@Component({
    selector: 'dsh-document-item',
    templateUrl: 'document-item.component.html',
    styleUrls: ['document-item.component.scss']
})
export class DocumentItemComponent {
    @Input() file: FileData;
}
