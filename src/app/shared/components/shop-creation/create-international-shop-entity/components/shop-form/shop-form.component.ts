import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { createTypeUnionDefaultForm } from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';
import {
    createValidatedAbstractControlProviders,
    ValidatedWrappedAbstractControlSuperclass,
    RequiredSuper,
} from '@dsh/utils';

import { IntegrationsEnum } from '../../../../../../integration';
import { InternationalShopEntityFormValue } from '../../types';

@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(ShopFormComponent),
})
export class ShopFormComponent
    extends ValidatedWrappedAbstractControlSuperclass<InternationalShopEntityFormValue>
    implements OnInit
{
    @Input() integration?: IntegrationsEnum;
    @Input() paymentInstitution?: number;

    formControl = this.fb.group<InternationalShopEntityFormValue>({
        shopDetails: null,
        orgDetails: createTypeUnionDefaultForm(),
        paymentInstitution: null,
        bankAccount: createTypeUnionDefaultForm(),
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        if (this.paymentInstitution) {
            this.formControl.controls['paymentInstitution'].patchValue(this.paymentInstitution);
        }
        return super.ngOnInit();
    }
}
