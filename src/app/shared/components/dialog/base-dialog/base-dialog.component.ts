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
    @Input() confirmButtonName: string;
    @Input() confirmButtonDisabled: boolean;

    @coerceBoolean
    @Input()
    hasDivider: boolean;

    @Output() cancel = new EventEmitter<void>();
    @Output() confirm = new EventEmitter<void>();

    cancelDialog(): void {
        this.cancel.emit();
    }

    confirmDialog(): void {
        this.confirm.emit();
    }
}
