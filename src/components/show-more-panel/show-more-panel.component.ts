import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-show-more-panel',
    templateUrl: 'show-more-panel.component.html',
    styleUrls: ['show-more-panel.component.scss']
})
export class ShowMorePanelComponent {
    @Input()
    disabled: boolean;

    @Input()
    isLoading: boolean;

    @Output()
    showMoreEvent: EventEmitter<void> = new EventEmitter();

    showMore() {
        this.showMoreEvent.emit();
    }
}
