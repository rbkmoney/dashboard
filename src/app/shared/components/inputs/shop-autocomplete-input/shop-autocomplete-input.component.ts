import { Component, Injector, Input } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { map } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/autocomplete-input';
import { coerceBoolean } from '@dsh/utils';

const shopToOption = (shop: Shop): Option<Shop> => ({
    label: shop?.details?.name,
    value: shop,
});

const shopsToOptions = (shops: Shop[]): Option<Shop>[] => shops.map(shopToOption);

@UntilDestroy()
@Component({
    selector: 'dsh-shop-autocomplete-input',
    templateUrl: 'shop-autocomplete-input.component.html',
    providers: [provideValueAccessor(ShopAutocompleteInputComponent)],
})
export class ShopAutocompleteInputComponent extends WrappedFormControlSuperclass<string> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$ = this.apiShopsService.shops$.pipe(map(shopsToOptions), untilDestroyed(this));

    constructor(injector: Injector, private apiShopsService: ApiShopsService) {
        super(injector);
    }

    displayWith(value: Shop): string {
        return value?.details?.name;
    }
}
