import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-expansion-item-content',
    templateUrl: 'content.component.html',
    styleUrls: ['content.component.scss']
})
export class ContentComponent {
    @Input() opened: boolean;
}
