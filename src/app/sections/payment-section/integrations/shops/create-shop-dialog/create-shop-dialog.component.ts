import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'dsh-create-shop-dialog',
    templateUrl: 'create-shop-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateShopDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<CreateShopDialogComponent, 'cancel' | 'send'>,
        @Inject(MAT_DIALOG_DATA) public data: { envID: string }
    ) {}
}
