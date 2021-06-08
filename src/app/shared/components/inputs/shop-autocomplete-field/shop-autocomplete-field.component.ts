import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { map } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/autocomplete-field';
import { coerceBoolean } from '@dsh/utils';

const shopToOption = (shop: Shop): Option<Shop> => ({
    label: shop?.details?.name,
    value: shop,
});

const shopsToOptions = (shops: Shop[]): Option<Shop>[] => shops.map(shopToOption);

@Component({
    selector: 'dsh-shop-autocomplete-field',
    templateUrl: 'shop-autocomplete-field.component.html',
    providers: [provideValueAccessor(ShopAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopAutocompleteFieldComponent extends WrappedFormControlSuperclass<string> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$ = this.apiShopsService.shops$.pipe(map(shopsToOptions));

    constructor(injector: Injector, private apiShopsService: ApiShopsService) {
        super(injector);
    }

    displayWith(value: Shop): string {
        return value?.details?.name;
    }
}
