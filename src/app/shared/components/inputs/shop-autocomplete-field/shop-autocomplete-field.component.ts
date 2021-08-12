import { ChangeDetectionStrategy, Component, Inject, Injector, Input, Optional } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiShopsService, toLiveShops } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/select-search-field';
import { shareReplayRefCount } from '@dsh/operators';
import { coerceBoolean } from '@dsh/utils';

import { SHOPS } from './shops-token';

@Component({
    selector: 'dsh-shop-field',
    templateUrl: 'shop-autocomplete-field.component.html',
    providers: [provideValueAccessor(ShopAutocompleteFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopAutocompleteFieldComponent extends WrappedFormControlSuperclass<Shop> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options: Option<Shop>[] = [];

    constructor(
        injector: Injector,
        shopsService: ApiShopsService,
        @Inject(SHOPS)
        @Optional()
        private shops$: Observable<Shop[]> = shopsService.shops$.pipe(map(toLiveShops), shareReplayRefCount())
    ) {
        super(injector);
    }
}
