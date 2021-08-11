import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';

import { Shop } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/select-search-field';
import { coerceBoolean } from '@dsh/utils';

import { shopToOption } from './utils';

@Component({
    selector: 'dsh-shop-field',
    templateUrl: 'shop-autocomplete-field.component.html',
    providers: [provideValueAccessor(ShopAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopAutocompleteFieldComponent extends WrappedFormControlSuperclass<Shop> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;
    @Input() set shops(shops: Shop[]) {
        this.options = shops.map(shopToOption);
    }

    options: Option<Shop>[] = [];

    constructor(injector: Injector) {
        super(injector);
    }
}
