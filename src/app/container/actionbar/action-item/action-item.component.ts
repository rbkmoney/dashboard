import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-action-item',
    templateUrl: 'action-item.component.html',
    styleUrls: ['action-item.component.scss']
})
export class ActionItemComponent {
    @Input() iconName: string;
}
