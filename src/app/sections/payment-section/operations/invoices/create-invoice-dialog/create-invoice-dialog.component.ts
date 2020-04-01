import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';
import { Observable } from 'rxjs';

import { InvoiceService } from '../../../../../api';
import { ShopInfo } from '../../../../../api-codegen/dark-api';

const EMPTY_CART_ITEM = { product: '', quantity: '', price: '', taxMode: '' };

@Component({
    selector: 'dsh-create-invoice-dialog',
    templateUrl: 'create-invoice-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInvoiceDialogComponent {
    form = this.fb.group({
        shopID: null,
        dueDate: moment()
            .add(1, 'month')
            .endOf('day'),
        product: '',
        cart: this.fb.array([this.fb.group(EMPTY_CART_ITEM)])
    });
    shopsInfo$: Observable<ShopInfo[]>;

    get cart() {
        return this.form.controls.cart as FormArray;
    }

    constructor(
        private dialogRef: MatDialogRef<CreateInvoiceDialogComponent, 'cancel' | 'create'>,
        private invoiceService: InvoiceService,
        private transloco: TranslocoService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data: { shopsInfo$: Observable<ShopInfo[]> }
    ) {
        this.shopsInfo$ = data.shopsInfo$;
    }

    cancel() {
        this.dialogRef.close('cancel');
    }

    create() {
        const { value } = this.form;
        this.invoiceService
            .createInvoice({
                shopID: value.shopID,
                dueDate: value.dueDate,
                currency: 'RUB',
                product: value.product,
                metadata: undefined
            })
            .subscribe(
                () => {
                    this.dialogRef.close('create');
                },
                () => {
                    this.snackBar.open(this.transloco.translate('commonError'), this.transloco.translate('ok'));
                }
            );
    }

    add() {
        this.cart.push(this.fb.group(EMPTY_CART_ITEM));
    }

    remove(idx: number) {
        this.cart.removeAt(idx);
    }
}
