import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { coerceBoolean } from '../../../../utils/coerce';

@Component({
    selector: 'dsh-filter-button-actions',
    templateUrl: 'filter-button-actions.component.html',
    styleUrls: ['filter-button-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterButtonActionsComponent {
    @Input() @coerceBoolean withoutClear = false;
    @Output() clear = new EventEmitter<MouseEvent>();
    @Output() save = new EventEmitter<MouseEvent>();
}
