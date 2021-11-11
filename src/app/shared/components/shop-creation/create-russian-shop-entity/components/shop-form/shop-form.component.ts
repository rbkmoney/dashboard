import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { createValidatedAbstractControlProviders, ValidatedWrappedAbstractControlSuperclass } from '@dsh/utils';

import { createTypeUnionDefaultForm } from '../../../created-existing-switch/created-existing-switch.component';
import { RussianShopForm } from '../../types/russian-shop-entity';

@UntilDestroy()
@Component({
    selector: 'dsh-shop-form',
    templateUrl: 'shop-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createValidatedAbstractControlProviders(ShopFormComponent),
})
export class ShopFormComponent extends ValidatedWrappedAbstractControlSuperclass<RussianShopForm> {
    formControl = this.fb.group<RussianShopForm>({
        shopDetails: null,
        orgDetails: null,
        bankAccount: createTypeUnionDefaultForm(),
        paymentInstitution: null,
        currency: null,
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
