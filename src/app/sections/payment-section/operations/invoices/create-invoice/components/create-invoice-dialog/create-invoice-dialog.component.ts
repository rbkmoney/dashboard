import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import pick from 'lodash-es/pick';
import moment from 'moment';

import { InvoiceService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';

import { FormData } from '../../../../../../create-invoice-form';
import { CreateInvoiceDialogResponse } from '../../types/create-invoice-dialog-response';

@UntilDestroy()
@Component({
    selector: 'dsh-create-invoice-dialog',
    templateUrl: 'create-invoice-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateInvoiceDialogComponent {
    formControl = new FormControl<FormData>();
    valid: boolean;
    empty: boolean;

    constructor(
        private dialogRef: MatDialogRef<CreateInvoiceDialogComponent, CreateInvoiceDialogResponse>,
        @Inject(MAT_DIALOG_DATA) public shops: Shop[],
        private invoiceService: InvoiceService
    ) {}

    cancel(): void {
        this.dialogRef.close('cancel');
    }

    create(): void {
        const { value } = this.formControl;
        this.invoiceService
            .createInvoice({
                ...pick(value, ['product', 'description', 'cart', 'shopID']),
                dueDate: moment(value.dueDate).utc().endOf('d').format(),
                currency: this.shops.find((s) => s.id === value.shopID)?.account?.currency,
                metadata: {},
            })
            .pipe(untilDestroyed(this))
            .subscribe(({ invoice }) => this.dialogRef.close(invoice));
    }
}
