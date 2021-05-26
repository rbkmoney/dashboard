import { ChangeDetectionStrategy, Component, Injector, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import isEqual from 'lodash-es/isEqual';
import * as moment from 'moment';
import { Moment } from 'moment';
import { distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';
import { Overwrite } from 'utility-types';

import { InvoiceLineTaxVAT } from '@dsh/api-codegen/anapi';
import { Shop } from '@dsh/api-codegen/capi';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { replaceFormArrayValue, getFormValueChanges, toMinor, getFormValidationChanges } from '@dsh/utils';

export const WITHOUT_VAT = Symbol('without VAT');
export const EMPTY_CART_ITEM: CartItem = { product: '', quantity: null, price: null, taxVatRate: WITHOUT_VAT };
export const EMPTY_FORM_DATA: FormData = {
    shopID: null,
    dueDate: null,
    product: '',
    description: '',
    currency: '',
    cart: [EMPTY_CART_ITEM],
};

interface CartItem {
    product: string;
    quantity: number;
    price: number;
    taxVatRate: string | typeof WITHOUT_VAT;
}

export interface FormData {
    shopID: string;
    dueDate: Moment;
    product: string;
    description: string;
    currency: string;
    cart: CartItem[];
}

@UntilDestroy()
@Component({
    selector: 'dsh-create-invoice-form',
    templateUrl: 'create-invoice-form.component.html',
    styleUrls: ['create-invoice-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(CreateInvoiceFormComponent)],
})
export class CreateInvoiceFormComponent extends FormControlSuperclass<FormData> implements OnInit {
    @Input() shops: Shop[];
    @Output() valid = new EventEmitter<boolean>();
    @Output() empty = new EventEmitter<boolean>();

    form = this.fb.group<Overwrite<FormData, { cart: FormArray<FormGroup<CartItem>> }>>({
        ...EMPTY_FORM_DATA,
        cart: this.fb.array<FormGroup<CartItem>>([this.fb.group(EMPTY_CART_ITEM)]),
    });
    totalAmount$ = this.form.controls.cart.valueChanges.pipe(
        startWith(this.form.controls.cart.value),
        map((v) =>
            v
                .map(({ price, quantity }) => price * quantity)
                .reduce((sum, s) => sum + s, 0)
                .toFixed(2)
        ),
        shareReplay(SHARE_REPLAY_CONF)
    );
    taxVatRates = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = WITHOUT_VAT;

    get minDate(): Moment {
        return moment().add('2', 'day').startOf('day');
    }

    constructor(private fb: FormBuilder, injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((v) =>
                this.emitOutgoingValue({ ...v, cart: v.cart.map((i) => ({ ...i, price: toMinor(i.price) })) })
            );
        getFormValueChanges(this.form)
            .pipe(
                map((v) => isEqual(v, EMPTY_FORM_DATA)),
                distinctUntilChanged(),
                untilDestroyed(this)
            )
            .subscribe((v) => this.empty.emit(v));
        getFormValidationChanges(this.form)
            .pipe(untilDestroyed(this))
            .subscribe((v) => this.valid.emit(v));
    }

    handleIncomingValue(value: FormData): void {
        value = { ...EMPTY_FORM_DATA, ...(value || {}) };
        replaceFormArrayValue(this.form.controls.cart, value.cart, (v) => this.fb.group(v));
        this.form.setValue(value);
    }

    addCartItem(): void {
        this.form.controls.cart.push(this.fb.group(EMPTY_CART_ITEM));
    }

    removeCartItem(idx: number): void {
        this.form.controls.cart.removeAt(idx);
    }
}
