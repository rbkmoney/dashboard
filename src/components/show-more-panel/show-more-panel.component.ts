import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'dsh-show-more-panel',
    templateUrl: 'show-more-panel.component.html',
    styleUrls: ['show-more-panel.component.scss']
})
export class ShowMorePanelComponent {
    @Input()
    isLoading: boolean;

    @Output()
    showMore: EventEmitter<void> = new EventEmitter();

    getMore() {
        this.showMore.emit();
    }
}
