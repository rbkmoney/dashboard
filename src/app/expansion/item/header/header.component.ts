import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'dsh-expansion-item-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})
export class HeaderComponent {
    @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter();

    @Input() opened = false;

    toggle() {
        this.opened = !this.opened;
        this.toggleEvent.emit(this.opened);
    }
}
