import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';

import { createTypeUnionDefaultForm } from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.component';
import { createValidatedAbstractControlProviders, ValidatedWrappedAbstractControlSuperclass } from '@dsh/utils';

import { IntegrationsEnum } from '../../../../../../integration';
import { InternationalShopEntityFormValue } from '../../types';

@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(ShopFormComponent),
})
export class ShopFormComponent extends ValidatedWrappedAbstractControlSuperclass<InternationalShopEntityFormValue> {
    @Input() integration?: IntegrationsEnum;

    formControl = this.fb.group<InternationalShopEntityFormValue>({
        shopDetails: null,
        orgDetails: createTypeUnionDefaultForm(),
        paymentInstitution: null,
        bankAccount: createTypeUnionDefaultForm(),
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
