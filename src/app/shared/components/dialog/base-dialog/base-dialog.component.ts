import { Component, EventEmitter, Input, Output } from '@angular/core';

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
