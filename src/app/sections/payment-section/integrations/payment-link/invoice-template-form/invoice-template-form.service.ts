import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { map, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { toMinor } from '../../../../../../utils';
import { InvoiceTemplatesService, ShopService } from '../../../../../api';
import {
    InvoiceLineTaxMode,
    InvoiceLineTaxVAT,
    InvoiceTemplateCreateParams,
    InvoiceTemplateDetails,
    InvoiceTemplateLineCost,
    InvoiceTemplateLineCostFixed,
    InvoiceTemplateLineCostRange,
    InvoiceTemplateLineCostUnlim,
    InvoiceTemplateMultiLine,
    InvoiceTemplateSingleLine,
    LifetimeInterval
} from '../../../../../api-codegen/capi';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { filterShopsByEnv } from '../../../operations/operators';
import { lifetimeValidator } from './lifetime-validator';

export enum TemplatType {
    singleLine = 'InvoiceTemplateSingleLine',
    multiLine = 'InvoiceTemplateMultiLine'
}

export enum CostType {
    unlim = 'InvoiceTemplateLineCostUnlim',
    fixed = 'InvoiceTemplateLineCostFixed',
    range = 'InvoiceTemplateLineCostRange'
}

export const withoutVAT = Symbol('without VAT');

@Injectable()
export class InvoiceTemplateFormService {
    private createInvoiceTemplateParams$ = new Subject<void>();

    shops$ = this.route.params.pipe(
        pluck('envID'),
        filterShopsByEnv(this.shopService.shops$),
        shareReplay(SHARE_REPLAY_CONF)
    );

    invoiceTemplateAndToken$ = this.createInvoiceTemplateParams$.pipe(
        map(() => this.getInvoiceTemplateCreateParams()),
        switchMap(p => this.invoiceTemplatesService.createInvoiceTemplate(p)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    form = this.createForm();

    get cartForm() {
        return this.form.controls.cart as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        private invoiceTemplatesService: InvoiceTemplatesService,
        private route: ActivatedRoute,
        private shopService: ShopService
    ) {
        const templateType$ = this.form.controls.templateType.valueChanges.pipe(
            startWith(this.form.value.templateType),
            shareReplay(SHARE_REPLAY_CONF)
        );
        const costType$ = this.form.controls.costType.valueChanges.pipe(startWith(this.form.value.costType));
        templateType$.subscribe(templateType =>
            templateType === TemplatType.multiLine ? this.cartForm.enable() : this.cartForm.disable()
        );
        combineLatest([templateType$, costType$]).subscribe(([templateType, costType]) => {
            const { cost, upperBound, lowerBound } = this.form.controls;
            if (templateType === TemplatType.singleLine) {
                switch (costType) {
                    case CostType.range:
                        upperBound.enable();
                        lowerBound.enable();
                        cost.disable();
                        return;
                    case CostType.fixed:
                        upperBound.disable();
                        lowerBound.disable();
                        cost.enable();
                        return;
                }
            } else {
                upperBound.disable();
                lowerBound.disable();
                cost.disable();
            }
        });
    }

    createInvoiceTemplate() {
        this.createInvoiceTemplateParams$.next();
    }

    clear() {
        this.cartForm.clear();
        this.addProduct();
        this.form.patchValue(this.createForm().value);
    }

    addProduct() {
        this.cartForm.push(this.createProductFormGroup());
    }

    removeProduct(idx: number) {
        this.cartForm.removeAt(idx);
    }

    private createForm() {
        return this.fb.group({
            shopId: '',
            description: '',
            lifetime: this.fb.group(
                {
                    days: null,
                    months: null,
                    years: null
                },
                { validators: [lifetimeValidator] }
            ),
            costType: CostType.unlim,
            templateType: TemplatType.singleLine,
            taxMode: withoutVAT,
            cart: this.fb.array([this.createProductFormGroup()]),
            lowerBound: null,
            upperBound: null,
            cost: null
        });
    }

    private createProductFormGroup() {
        return this.fb.group({
            product: '',
            quantity: null,
            price: null,
            tax: withoutVAT
        });
    }

    private getInvoiceTemplateCreateParams(): InvoiceTemplateCreateParams {
        const { value } = this.form;
        return {
            shopID: value.shopID,
            description: value.description,
            lifetime: this.getLifetimeInterval(),
            details: this.getInvoiceTemplateDetails()
        };
    }

    private getLifetimeInterval(): LifetimeInterval {
        const { value } = this.form;
        return {
            days: value.lifetime.days || 0,
            months: value.lifetime.months || 0,
            years: value.lifetime.years || 0
        };
    }

    private getInvoiceTemplateDetails(): InvoiceTemplateDetails {
        const { value } = this.form;
        const { cart } = value;
        switch (value.templateType) {
            case TemplatType.singleLine:
                return {
                    templateType: value.templateType,
                    product: '',
                    price: this.getInvoiceTemplateLineCost(),
                    ...this.getInvoiceLineTaxMode(value.taxMode)
                } as InvoiceTemplateSingleLine;

            case TemplatType.multiLine:
                return {
                    templateType: value.templateType,
                    cart: cart.map(c => ({
                        product: c.product,
                        quantity: c.quantity,
                        price: c.price,
                        ...this.getInvoiceLineTaxMode(c.taxMode)
                    })),
                    currency: 'RUB'
                } as InvoiceTemplateMultiLine;
        }
    }

    private getInvoiceTemplateLineCost(): InvoiceTemplateLineCost {
        const { value } = this.form;
        const type = {
            costType: value.costType
        };
        const currency = {
            currency: 'RUB'
        };
        switch (value.costType) {
            case CostType.unlim:
                return type as InvoiceTemplateLineCostUnlim;
            case CostType.fixed:
                return {
                    ...type,
                    ...currency,
                    amount: toMinor(value.cost)
                } as InvoiceTemplateLineCostFixed;
            case CostType.range:
                return {
                    ...type,
                    ...currency,
                    range: {
                        lowerBound: toMinor(value.lowerBound),
                        upperBound: toMinor(value.lowerBound)
                    }
                } as InvoiceTemplateLineCostRange;
        }
    }

    private getInvoiceLineTaxMode(rate: typeof withoutVAT | InvoiceLineTaxVAT.RateEnum): InvoiceLineTaxMode | {} {
        return rate === withoutVAT
            ? {}
            : {
                  type: InvoiceLineTaxMode.TypeEnum.InvoiceLineTaxVAT,
                  rate
              };
    }
}
