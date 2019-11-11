import { Component, Input } from '@angular/core';


@Component({
    selector: 'dsh-document-item',
    templateUrl: 'document-item.component.html',
    styleUrls: ['document-item.component.scss']
})
export class DocumentItemComponent {
    @Input() fileName: string;
}
