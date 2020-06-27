import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'dsh-filter-button-actions',
    templateUrl: 'filter-button-actions.component.html',
    styleUrls: ['filter-button-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterButtonActionsComponent {
    @Output() clear = new EventEmitter<MouseEvent>();
    @Output() save = new EventEmitter<MouseEvent>();
}
