import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { SHARE_REPLAY_CONF } from 'src/app/custom-operators';

import { InvoiceService } from '../../../../../api';
import { InvoiceLine, InvoiceLineTaxMode, InvoiceLineTaxVAT } from '../../../../../api-codegen/anapi';
import { ShopInfo } from '../../operators';

const WITHOUT_VAT = Symbol('without VAT');
const EMPTY_CART_ITEM = { product: '', quantity: null, price: null, taxVatRate: WITHOUT_VAT };

@Component({
    selector: 'dsh-create-invoice-dialog',
    templateUrl: 'create-invoice-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInvoiceDialogComponent {
    form = this.fb.group({
        shopID: null,
        dueDate: null,
        product: '',
        currency: 'RUB',
        cart: this.fb.array([this.fb.group(EMPTY_CART_ITEM)])
    });
    shopsInfo$: Observable<ShopInfo[]>;

    totalAmount$ = this.cart.valueChanges.pipe(
        startWith(this.cart.value),
        map(v => v.map(({ price, quantity }) => price * quantity).reduce((sum, s) => (sum += s), 0)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    taxVatRates = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = WITHOUT_VAT;

    get cart() {
        return this.form.controls.cart as FormArray;
    }

    constructor(
        private dialogRef: MatDialogRef<CreateInvoiceDialogComponent, 'cancel' | 'create'>,
        private invoiceService: InvoiceService,
        private transloco: TranslocoService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data: { shopsInfo$: Observable<ShopInfo[]> },
        private router: Router
    ) {
        this.shopsInfo$ = data.shopsInfo$;
    }

    cancel() {
        this.dialogRef.close('cancel');
    }

    create() {
        const { value } = this.form;
        const cart = this.cart.controls.map(({ value: v }) => {
            const product: InvoiceLine = {
                product: v.product,
                quantity: Number(v.quantity),
                price: Number(v.price)
            };
            if (v.taxVatRate !== WITHOUT_VAT) {
                product.taxMode = {
                    type: InvoiceLineTaxMode.TypeEnum.InvoiceLineTaxVAT,
                    rate: v.taxVatRate
                } as InvoiceLineTaxMode;
            }
            return product;
        });
        this.invoiceService
            .createInvoice({
                shopID: value.shopID,
                dueDate: moment(value.dueDate)
                    .utc()
                    .format(),
                currency: value.currency,
                product: value.product,
                cart,
                metadata: {}
            })
            .subscribe(
                ({ invoice }) => {
                    this.dialogRef.close('create');
                    this.router.navigate(['invoice', invoice.id]);
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
