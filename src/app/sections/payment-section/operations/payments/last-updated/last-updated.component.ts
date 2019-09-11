import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-last-updated',
    templateUrl: 'last-updated.component.html',
    styleUrls: ['last-updated.component.scss']
})
export class LastUpdatedComponent {
    @Input() lastUpdated: string;
    @Output() update = new EventEmitter();
}
