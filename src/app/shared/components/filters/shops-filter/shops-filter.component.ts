import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { provideValueAccessor } from '@s-libs/ng-core';
import { combineLatest } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-shops-filter',
    templateUrl: 'shops-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(ShopsFilterComponent)],
})
export class ShopsFilterComponent extends FilterSuperclass<Shop['id'][]> {
    @Input() shops: Shop[];

    labels$ = combineLatest([this.savedValue$, this.shopsService.shops$]).pipe(
        map(([selectedShopIds, shops]) =>
            (selectedShopIds || []).map((id) => shops.find((s) => s.id === id)?.details?.name || id)
        ),
        share()
    );

    constructor(injector: Injector, private shopsService: ApiShopsService) {
        super(injector);
    }
}
