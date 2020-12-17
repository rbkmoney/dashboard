import { Component, EventEmitter, Input, Output } from '@angular/core';

// TODO: add support directives ng-content selectors
// TODO: add unit test for template with new ng-content
@Component({
    selector: 'dsh-base-dialog',
    templateUrl: 'base-dialog.component.html',
    styleUrls: ['base-dialog.component.scss'],
})
export class BaseDialogComponent {
    @Input() title: string;
    @Input() cancelButton: string;
    @Input() confirmButton: string;
    @Input() disabledConfirm: boolean;

    @Output() cancel = new EventEmitter<void>();
    @Output() confirm = new EventEmitter<void>();

    cancelDialog(): void {
        this.cancel.emit();
    }

    confirmDialog(): void {
        this.confirm.emit();
    }
}
