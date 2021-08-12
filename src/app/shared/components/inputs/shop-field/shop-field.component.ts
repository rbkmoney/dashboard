import { ChangeDetectionStrategy, Component, Inject, Injector, Input, Optional } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiShopsService, toLiveShops } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { shopToOption } from '@dsh/app/shared/components/inputs/shop-field/utils/shops-to-options';
import { Option } from '@dsh/components/form-controls/select-search-field';
import { shareReplayRefCount } from '@dsh/operators';
import { coerceBoolean } from '@dsh/utils';

import { SHOPS } from './shops-token';

@Component({
    selector: 'dsh-shop-field',
    templateUrl: 'shop-field.component.html',
    providers: [provideValueAccessor(ShopFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFieldComponent extends WrappedFormControlSuperclass<Shop> {
    @Input() label: string;
    @Input() @coerceBoolean required = false;

    options$: Observable<Option<Shop>[]> = defer(
        () => this.shops$ || this.shopsService.shops$.pipe(map(toLiveShops))
    ).pipe(
        map((shops) => shops.map(shopToOption)),
        shareReplayRefCount()
    );

    constructor(
        injector: Injector,
        private shopsService: ApiShopsService,
        @Inject(SHOPS)
        @Optional()
        private shops$?: Observable<Shop[]>
    ) {
        super(injector);
    }
}
