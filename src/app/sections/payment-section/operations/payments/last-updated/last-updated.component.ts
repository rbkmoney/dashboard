import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Moment } from 'moment';

@Component({
    selector: 'dsh-last-updated',
    templateUrl: 'last-updated.component.html',
    styleUrls: ['last-updated.component.scss']
})
export class LastUpdatedComponent {
    @Input() lastUpdated: Moment;

    @Output() update = new EventEmitter();

    refresh() {
        this.update.emit();
    }
}
