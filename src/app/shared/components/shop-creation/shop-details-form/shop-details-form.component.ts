import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { provideValueAccessor } from '@s-libs/ng-core';

import { Category } from '@dsh/api-codegen/capi';
import { WrappedAbstractControlSuperclass } from '@dsh/utils';

export interface ShopDetailsForm {
    name: string;
    url?: string;
    category: Category;
}

@Component({
    selector: 'dsh-shop-details-form',
    templateUrl: 'shop-details-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(ShopDetailsFormComponent)],
})
export class ShopDetailsFormComponent extends WrappedAbstractControlSuperclass<ShopDetailsForm> {
    formControl = this.fb.group<ShopDetailsForm>({
        url: '',
        name: '',
        category: null,
    });

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }
}
