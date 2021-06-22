import { Component, EventEmitter, Input, Output } from '@angular/core';

import { coerceBoolean } from '@dsh/utils';

// TODO: add unit test for template with new ng-content
@Component({
    selector: 'dsh-base-dialog',
    templateUrl: 'base-dialog.component.html',
    styleUrls: ['base-dialog.component.scss'],
})
export class BaseDialogComponent {
    @Input() title: string;
    @coerceBoolean @Input() disabled: boolean;
    @coerceBoolean @Input() hasDivider = true;

    @Output() cancel = new EventEmitter<void>();

    cancelDialog(): void {
        if (!this.disabled) {
            this.cancel.emit();
        }
    }
}
