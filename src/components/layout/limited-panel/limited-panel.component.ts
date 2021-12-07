import { ChangeDetectionStrategy, Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'dsh-limited-panel',
    templateUrl: 'limited-panel.component.html',
    styleUrls: ['limited-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimitedPanelComponent {
    @Output() showMore = new EventEmitter<void>();
    @Input() hasMore = false;

    showMoreItems(): void {
        this.showMore.emit();
    }
}
