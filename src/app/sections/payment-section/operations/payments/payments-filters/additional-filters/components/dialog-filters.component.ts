import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PaymentsAdditionalFilters } from '../../types/payments-additional-filters';

@Component({
    selector: 'dsh-dialog-filters',
    templateUrl: 'dialog-filters.component.html',
    styleUrls: ['dialog-filters.component.scss'],
})
export class DialogFiltersComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: PaymentsAdditionalFilters,
        private dialogRef: MatDialogRef<DialogFiltersComponent, PaymentsAdditionalFilters>
    ) {}

    clear(): void {
        // TODO: fix logic. Should not close dialog. Only reset params
        this.dialogRef.close({});
    }

    confirm(): void {
        this.dialogRef.close({ anyField: 'some value' });
    }
}
