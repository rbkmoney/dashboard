import { Injectable } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import moment from 'moment';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { SHARE_REPLAY_CONF } from 'src/app/custom-operators';

import { InvoiceService } from '../../../../../api';
import { InvoiceLine, InvoiceLineTaxMode } from '../../../../../api-codegen/anapi';

export const WITHOUT_VAT = Symbol('without VAT');
export const EMPTY_CART_ITEM = { product: '', quantity: null, price: null, taxVatRate: WITHOUT_VAT };

@Injectable()
export class CreateInvoiceDialogService {
    form = this.fb.group({
        shopID: null,
        dueDate: null,
        product: '',
        currency: 'RUB',
        cart: this.fb.array([this.fb.group(EMPTY_CART_ITEM)])
    });

    totalAmount$ = this.form.controls.cart.valueChanges.pipe(
        startWith(this.form.controls.cart.value),
        map(v => v.map(({ price, quantity }) => price * quantity).reduce((sum, s) => (sum += s), 0)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private invoiceService: InvoiceService, private fb: FormBuilder) {}

    createInvoice() {
        const { value } = this.form;
        return this.invoiceService.createInvoice({
            shopID: value.shopID,
            dueDate: moment(value.dueDate)
                .utc()
                .format(),
            currency: value.currency,
            product: value.product,
            cart: value.cart.map(this.getCartItemValue.bind(this)),
            metadata: {}
        });
    }

    addCartItem() {
        (this.form.controls.cart as FormArray).push(this.fb.group(EMPTY_CART_ITEM));
    }

    removeCartItem(idx: number) {
        (this.form.controls.cart as FormArray).removeAt(idx);
    }

    private getCartItemValue(v: any) {
        const product: InvoiceLine = {
            product: v.product,
            quantity: v.quantity,
            price: v.price * 100
        };
        if (v.taxVatRate !== WITHOUT_VAT) {
            product.taxMode = {
                type: InvoiceLineTaxMode.TypeEnum.InvoiceLineTaxVAT,
                rate: v.taxVatRate
            } as InvoiceLineTaxMode;
        }
        return product;
    }
}
