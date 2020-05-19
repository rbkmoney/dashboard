import { Injectable } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { filter, map, pluck, share, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { toMinor } from '../../../../../../utils';
import { InvoiceTemplatesService, ShopService } from '../../../../../api';
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
} from '../../../../../api-codegen/capi';
import { filterError, filterPayload, progress, replaceError, SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { takeWhenChanged } from '../../../../../custom-operators/take-when-changed';
import { filterShopsByEnv } from '../../../operations/operators';
import { lifetimeValidator } from './lifetime-validator';

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
export class InvoiceTemplateFormService {
    private nextInvoiceTemplate$ = new ReplaySubject<void>(1);

    form = this.createForm();

    private createInvoiceTemplate$ = takeWhenChanged(this.nextInvoiceTemplate$, this.form.valueChanges).pipe(share());

    shops$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    summary$ = this.cartForm.valueChanges.pipe(
        startWith(this.cartForm.value),
        map((v) => v.reduce((sum, c) => sum + c.price * c.quantity, 0)),
        shareReplay(1)
    );

    invoiceTemplateAndToken$: Observable<InvoiceTemplateAndToken>;
    errors$: Observable<any>;
    isLoading$: Observable<boolean>;

    get cartForm() {
        return this.form.controls.cart as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        private invoiceTemplatesService: InvoiceTemplatesService,
        private route: ActivatedRoute,
        private shopService: ShopService,
        private dialog: MatDialog
    ) {
        const invoiceTemplateAndTokenWithErrors$ = this.createInvoiceTemplate$.pipe(
            map(() => this.getInvoiceTemplateCreateParams()),
            switchMap((p) => this.invoiceTemplatesService.createInvoiceTemplate(p).pipe(replaceError)),
            share()
        );
        this.invoiceTemplateAndToken$ = invoiceTemplateAndTokenWithErrors$.pipe(filterPayload, shareReplay(1));
        this.errors$ = invoiceTemplateAndTokenWithErrors$.pipe(filterError, shareReplay(1));
        this.isLoading$ = progress(this.createInvoiceTemplate$, invoiceTemplateAndTokenWithErrors$).pipe(
            shareReplay(1)
        );
        this.subscribeFormChanges();
    }

    create() {
        this.nextInvoiceTemplate$.next();
    }

    clear() {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(filter((r) => r === 'confirm'))
            .subscribe(() => {
                this.cartForm.clear();
                this.addProduct();
                this.form.patchValue(this.createForm().value);
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
            startWith(this.form.value.templateType),
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
            description: '',
            lifetime: this.fb.group(
                {
                    days: null,
                    months: null,
                    years: null,
                },
                { validators: [lifetimeValidator] }
            ),
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
            currency: 'RUB',
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

    private getInvoiceTemplateCreateParams(): InvoiceTemplateCreateParams {
        const { value } = this.form;
        return {
            shopID: value.shopID,
            description: value.description,
            lifetime: this.getLifetimeInterval(),
            details: this.getInvoiceTemplateDetails(),
        };
    }

    private getLifetimeInterval(): LifetimeInterval {
        const { lifetime } = this.form.value;
        return {
            days: lifetime.days || 0,
            months: lifetime.months || 0,
            years: lifetime.years || 0,
        };
    }

    private getInvoiceTemplateDetails(): InvoiceTemplateDetails {
        const {
            value,
            value: { cart, currency },
        } = this.form;
        switch (value.templateType) {
            case TemplateType.singleLine:
                return {
                    templateType: value.templateType,
                    product: value.product,
                    price: this.getInvoiceTemplateLineCost(),
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

    private getInvoiceTemplateLineCost(): InvoiceTemplateLineCost {
        const { costType, amount, range, currency } = this.form.value;
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
}
