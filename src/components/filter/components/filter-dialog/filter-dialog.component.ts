import { ChangeDetectionStrategy, Component, EventEmitter, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dsh-filter-dialog',
    templateUrl: 'filter-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            noClearButton: boolean;
            content: TemplateRef<unknown>;
            label: string;
            clear: EventEmitter<void>;
        },
        private dialogRef: MatDialogRef<'save' | 'clear'>
    ) {}

    save(): void {
        this.dialogRef.close('save');
    }

    clear(): void {
        this.data.clear.emit();
    }
}
