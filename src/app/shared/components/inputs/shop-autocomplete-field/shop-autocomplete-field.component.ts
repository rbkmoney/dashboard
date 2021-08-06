import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { map } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { coerceBoolean } from '@dsh/utils';

import { shopToOption } from './utils';

@Component({
    selector: 'dsh-shop-autocomplete-field',
    templateUrl: 'shop-autocomplete-field.component.html',
    providers: [provideValueAccessor(ShopAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopAutocompleteFieldComponent extends WrappedFormControlSuperclass<Shop> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$ = this.shopsService.shops$.pipe(map((shops) => shops.map(shopToOption)));

    constructor(injector: Injector, private shopsService: ApiShopsService) {
        super(injector);
    }
}
