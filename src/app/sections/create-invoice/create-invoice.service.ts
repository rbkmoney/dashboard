import { Injectable } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import get from 'lodash.get';
import moment from 'moment';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { InvoiceService } from '../../api';
import { InvoiceLine, InvoiceLineTaxMode, Shop } from '../../api-codegen/capi';
import { SHARE_REPLAY_CONF } from '../../custom-operators';

export const WITHOUT_VAT = Symbol('without VAT');
export const EMPTY_CART_ITEM = { product: '', quantity: null, price: null, taxVatRate: WITHOUT_VAT };

@Injectable()
export class CreateInvoiceService {
    form = this.createForm();

    totalAmount$ = this.form.controls.cart.valueChanges.pipe(
        startWith(this.form.controls.cart.value),
        map((v) => v.map(({ price, quantity }) => price * quantity).reduce((sum, s) => (sum += s), 0)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private invoiceService: InvoiceService, private fb: FormBuilder, private dialog: MatDialog) {}

    createInvoice(shops: Shop[]) {
        const { value } = this.form;
        return this.invoiceService.createInvoice({
            shopID: value.shopID,
            dueDate: moment(value.dueDate).utc().format(),
            currency: get(
                shops.find((s) => s.id === value.shopID),
                ['account', 'currency']
            ),
            product: value.product,
            description: value.description,
            cart: value.cart.map(this.getCartItemValue.bind(this)),
            metadata: {},
        });
    }

    addCartItem() {
        (this.form.controls.cart as FormArray).push(this.fb.group(EMPTY_CART_ITEM));
    }

    removeCartItem(idx: number) {
        (this.form.controls.cart as FormArray).removeAt(idx);
    }

    clear() {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(filter((r) => r === 'confirm'))
            .subscribe(() => {
                this.form.reset(this.createForm().value);
            });
    }

    private createForm() {
        return this.fb.group({
            shopID: null,
            dueDate: null,
            product: '',
            description: '',
            currency: '',
            cart: this.fb.array([this.fb.group(EMPTY_CART_ITEM)]),
        });
    }

    private getCartItemValue(v: any) {
        const product: InvoiceLine = {
            product: v.product,
            quantity: v.quantity,
            price: v.price * 100,
        };
        if (v.taxVatRate !== WITHOUT_VAT) {
            product.taxMode = {
                type: InvoiceLineTaxMode.TypeEnum.InvoiceLineTaxVAT,
                rate: v.taxVatRate,
            } as InvoiceLineTaxMode;
        }
        return product;
    }
}
