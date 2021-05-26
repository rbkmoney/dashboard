import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { coerceBoolean } from '@dsh/utils';

@Component({
    selector: 'dsh-filter',
    templateUrl: 'filter.component.html',
    styleUrls: ['filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
    @Input() label: string;
    @Input() activeLabel: string;
    @Input() content: TemplateRef<any>;
    @Input() @coerceBoolean active = false;
    @Input() @coerceBoolean disabled = false;
    @Input() @coerceBoolean noClearButton = false;

    @Output() save = new EventEmitter<void>();
    @Output() clear = new EventEmitter<void>();
}
