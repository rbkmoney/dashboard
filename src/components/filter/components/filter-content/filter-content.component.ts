import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-filter-content',
    templateUrl: 'filter-content.component.html',
    styleUrls: ['filter-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterContentComponent {
    @Input() @coerceBoolean noClearButton = false;

    @Output() save = new EventEmitter<MouseEvent>();
    @Output() clear = new EventEmitter<MouseEvent>();
}
