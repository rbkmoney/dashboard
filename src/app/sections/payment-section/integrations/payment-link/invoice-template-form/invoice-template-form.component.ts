import { ChangeDetectionStrategy, Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

import { InvoiceLineTaxVAT } from '../../../../../api-codegen/capi';

enum TemplatType {
    singleLine = 'InvoiceTemplateSingleLine',
    multiLine = 'InvoiceTemplateMultiLine'
}

enum CostType {
    unlim = 'InvoiceTemplateLineCostUnlim',
    fixed = 'InvoiceTemplateLineCostFixed',
    range = 'InvoiceTemplateLineCostRange'
}

const withoutVAT = Symbol('without VAT');

@Component({
    selector: 'dsh-invoice-template-form',
    templateUrl: 'invoice-template-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceTemplateFormComponent implements OnInit {
    @Output()
    next = new EventEmitter<void>();

    form = this.createForm();

    taxModes = Object.values(InvoiceLineTaxVAT.RateEnum);
    withoutVAT = withoutVAT;

    templateType = TemplatType;
    costType = CostType;

    templateTypes = Object.entries(TemplatType);
    costTypes = Object.entries(CostType);

    get cartFormArray() {
        return this.form.controls.cart as FormArray;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.controls.templateType.valueChanges.subscribe(templateType => {
            switch (templateType) {
                case TemplatType.multiLine:
                    this.cartFormArray.push(this.createProductForm());
                    break;
                case TemplatType.singleLine:
                    this.cartFormArray.clear();
                    break;
            }
        });
    }

    clear() {
        this.cartFormArray.clear();
        this.form.patchValue(this.createForm().value);
    }

    addProduct() {
        this.cartFormArray.push(this.createProductForm());
    }

    removeProduct(idx: number) {
        this.cartFormArray.removeAt(idx);
    }

    private createForm() {
        return this.fb.group({
            description: ['', [Validators.maxLength(1000)]],
            lifetime: this.fb.group({
                days: null,
                months: null,
                years: null
            }),
            costType: CostType.unlim,
            templateType: TemplatType.singleLine,
            taxMode: withoutVAT,
            cart: this.fb.array([])
        });
    }

    private createProductForm() {
        return this.fb.group({
            product: ['', [Validators.maxLength(1000)]],
            quantity: null,
            price: null,
            tax: withoutVAT
        });
    }
}
