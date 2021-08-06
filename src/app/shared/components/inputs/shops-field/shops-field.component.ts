import { Component, Injector, Input, OnChanges } from '@angular/core';
import { ComponentChanges } from '@rbkmoney/utils';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { defer, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from '@dsh/api-codegen/capi';
import { shareReplayRefCount } from '@dsh/operators';

@Component({
    selector: 'dsh-shops-field',
    templateUrl: 'shops-field.component.html',
    providers: [provideValueAccessor(ShopsFieldComponent)],
})
export class ShopsFieldComponent extends WrappedFormControlSuperclass<Shop['id'][]> implements OnChanges {
    @Input() shops: Shop[];

    options$ = defer(() => this.shops$).pipe(
        map((shops) => shops.map((shop) => ({ value: shop.id, label: shop.details.name }))),
        shareReplayRefCount()
    );

    private shops$ = new ReplaySubject<Shop[]>();

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnChanges({ shops }: ComponentChanges<ShopsFieldComponent>): void {
        if (shops) this.shops$.next(shops.currentValue);
    }
}
