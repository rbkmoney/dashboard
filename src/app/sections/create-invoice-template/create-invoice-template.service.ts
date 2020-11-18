import { Injectable } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import get from 'lodash.get';
import * as moment from 'moment';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, share, shareReplay, startWith, switchMap, take } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { toMinor } from '../../../utils';
import { InvoiceTemplatesService } from '../../api';
import {
    InvoiceLineTaxMode,
    InvoiceLineTaxVAT,
    InvoiceTemplateAndToken,
    InvoiceTemplateCreateParams,
    InvoiceTemplateDetails,
    InvoiceTemplateLineCost,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateLineCostUnlim,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine,
    LifetimeInterval,
    Shop,
} from '../../api-codegen/capi';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../custom-operators';

export enum TemplateType {
    singleLine = 'InvoiceTemplateSingleLine',
    multiLine = 'InvoiceTemplateMultiLine',
}

export enum CostType {
    unlim = 'InvoiceTemplateLineCostUnlim',
    fixed = 'InvoiceTemplateLineCostFixed',
    range = 'InvoiceTemplateLineCostRange',
}

export const withoutVAT = Symbol('without VAT');

@Injectable()
export class CreateInvoiceTemplateService {
    private nextInvoiceTemplate$ = new Subject<InvoiceTemplateCreateParams>();

    form = this.createForm();

    summary$ = this.cartForm.valueChanges.pipe(
        // TODO: add form types
        startWith<any, any>(this.cartForm.value),
        map((v) => v.reduce((sum, c) => sum + c.price * c.quantity, 0)),
        shareReplay(1)
    );

    invoiceTemplateAndToken$: Observable<InvoiceTemplateAndToken>;
    errors$: Observable<any>;
    isLoading$: Observable<boolean>;

    nextInvoiceTemplateAndToken$: Observable<InvoiceTemplateAndToken>;

    get cartForm() {
        return this.form.controls.cart as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        private invoiceTemplatesService: InvoiceTemplatesService,
        private dialog: MatDialog
    ) {
        const createInvoiceTemplate$ = this.nextInvoiceTemplate$.pipe(
            distinctUntilChanged((x, y) => JSON.stringify(x) === JSON.stringify(y)),
            share()
        );
        const notCreatedInvoiceTemplate$ = this.nextInvoiceTemplate$.pipe(
            distinctUntilChanged((x, y) => JSON.stringify(x) !== JSON.stringify(y)),
            share()
        );
        const invoiceTemplateAndTokenWithErrors$ = createInvoiceTemplate$.pipe(
            switchMap((p) => this.invoiceTemplatesService.createInvoiceTemplate(p).pipe(replaceError)),
            share()
        );
        this.invoiceTemplateAndToken$ = invoiceTemplateAndTokenWithErrors$.pipe(filterPayload, shareReplay(1));
        this.errors$ = invoiceTemplateAndTokenWithErrors$.pipe(filterError, shareReplay(1));
        this.isLoading$ = progress(createInvoiceTemplate$, invoiceTemplateAndTokenWithErrors$).pipe(shareReplay(1));

        this.nextInvoiceTemplateAndToken$ = merge(
            this.invoiceTemplateAndToken$,
            notCreatedInvoiceTemplate$.pipe(switchMap(() => this.invoiceTemplateAndToken$.pipe(take(1))))
        ).pipe(share());

        this.subscribeFormChanges();
        merge(
            this.invoiceTemplateAndToken$,
            this.errors$,
            this.isLoading$,
            this.nextInvoiceTemplateAndToken$
        ).subscribe();
    }

    create(shops: Shop[]) {
        this.nextInvoiceTemplate$.next(this.getInvoiceTemplateCreateParams(shops));
    }

    clear() {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(filter((r) => r === 'confirm'))
            .subscribe(() => {
                this.cartForm.clear();
                this.addProduct();
                this.form.reset(this.createForm().value);
            });
    }

    addProduct() {
        this.cartForm.push(this.createProductFormGroup());
    }

    removeProduct(idx: number) {
        this.cartForm.removeAt(idx);
    }

    private subscribeFormChanges() {
        const templateType$ = this.form.controls.templateType.valueChanges.pipe(
            startWith<TemplateType, TemplateType>(this.form.value.templateType),
            shareReplay(SHARE_REPLAY_CONF)
        );
        const costType$ = this.form.controls.costType.valueChanges.pipe(startWith(this.form.value.costType));
        templateType$.subscribe((templateType) => {
            const { product } = this.form.controls;
            if (templateType === TemplateType.multiLine) {
                this.cartForm.enable();
                product.disable();
            } else {
                this.cartForm.disable();
                product.enable();
            }
        });
        combineLatest([templateType$, costType$]).subscribe(([templateType, costType]) => {
            const { amount, range } = this.form.controls;
            if (templateType === TemplateType.multiLine || costType === CostType.unlim) {
                range.disable();
                amount.disable();
                return;
            }
            switch (costType) {
                case CostType.range:
                    range.enable();
                    amount.disable();
                    return;
                case CostType.fixed:
                    range.disable();
                    amount.enable();
                    return;
            }
        });
    }

    private createForm() {
        return this.fb.group({
            shopID: '',
            lifetime: '',
            costType: CostType.unlim,
            templateType: TemplateType.singleLine,
            product: '',
            taxMode: withoutVAT,
            cart: this.fb.array([this.createProductFormGroup()]),
            range: this.fb.group({
                lowerBound: null,
                upperBound: null,
            }),
            amount: null,
        });
    }

    private createProductFormGroup() {
        return this.fb.group({
            product: '',
            quantity: null,
            price: null,
            taxMode: withoutVAT,
        });
    }

    private getInvoiceTemplateCreateParams(shops: Shop[]): InvoiceTemplateCreateParams {
        const { value } = this.form;
        return {
            shopID: value.shopID,
            lifetime: this.getLifetimeInterval(),
            details: this.getInvoiceTemplateDetails(shops),
        };
    }

    private getLifetimeInterval(): LifetimeInterval {
        const { lifetime } = this.form.value;
        const diff = moment(lifetime).diff(moment().startOf('day'));
        const duration = moment.duration(diff);
        return {
            days: duration.days(),
            months: duration.months(),
            years: duration.years(),
        };
    }

    private getInvoiceTemplateDetails(shops: Shop[]): InvoiceTemplateDetails {
        const {
            value,
            value: { cart, shopID },
        } = this.form;
        const currency = this.getCurrencyByShopID(shopID, shops);
        switch (value.templateType) {
            case TemplateType.singleLine:
                return {
                    templateType: value.templateType,
                    product: value.product,
                    price: this.getInvoiceTemplateLineCost(shops),
                    ...this.getInvoiceLineTaxMode(value.taxMode),
                } as InvoiceTemplateSingleLine;
            case TemplateType.multiLine:
                return {
                    templateType: value.templateType,
                    cart: cart.map((c) => ({
                        product: c.product,
                        quantity: c.quantity,
                        price: toMinor(c.price),
                        ...this.getInvoiceLineTaxMode(c.taxMode),
                    })),
                    currency,
                } as InvoiceTemplateMultiLine;
        }
    }

    private getInvoiceTemplateLineCost(shops: Shop[]): InvoiceTemplateLineCost {
        const { costType, amount, range, shopID } = this.form.value;
        const currency = this.getCurrencyByShopID(shopID, shops);
        switch (costType) {
            case CostType.unlim:
                return { costType } as InvoiceTemplateLineCostUnlim;
            case CostType.fixed:
                return {
                    costType,
                    currency,
                    amount: toMinor(amount),
                } as InvoiceTemplateLineCostFixed;
            case CostType.range:
                return {
                    costType,
                    currency,
                    range: {
                        lowerBound: toMinor(range.lowerBound),
                        upperBound: toMinor(range.upperBound),
                    },
                } as InvoiceTemplateLineCostRange;
        }
    }

    private getInvoiceLineTaxMode(rate: typeof withoutVAT | InvoiceLineTaxVAT.RateEnum) {
        return rate === withoutVAT
            ? {}
            : {
                  taxMode: {
                      type: InvoiceLineTaxMode.TypeEnum.InvoiceLineTaxVAT,
                      rate,
                  },
              };
    }

    private getCurrencyByShopID(shopID: string, shops: Shop[]): string {
        return get(
            shops.find((s) => s.id === shopID),
            ['account', 'currency']
        );
    }
}
