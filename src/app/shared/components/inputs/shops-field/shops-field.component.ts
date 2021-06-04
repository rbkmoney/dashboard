import { Component, Injector, Input, OnChanges } from '@angular/core';
import { ComponentChanges } from '@rbkmoney/utils';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { combineLatest, defer, ReplaySubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ApiShopsService } from '@dsh/api';
import { PaymentInstitution, Shop } from '@dsh/api-codegen/capi';
import { SHARE_REPLAY_CONF } from '@dsh/operators';

import { getShopsByRealm } from '../../../../sections/payment-section/operations/operators';

import RealmEnum = PaymentInstitution.RealmEnum;

@Component({
    selector: 'dsh-shops-field',
    templateUrl: 'shops-field.component.html',
    providers: [provideValueAccessor(ShopsFieldComponent)],
})
export class ShopsFieldComponent extends WrappedFormControlSuperclass<Shop['id'][]> implements OnChanges {
    @Input() realm: RealmEnum;

    options$ = defer(() => combineLatest([this.shopsService.shops$, this.realm$])).pipe(
        map(([shops, realm]) => getShopsByRealm(shops, realm)),
        map((shops) => shops.map((shop) => ({ value: shop.id, label: shop.details.name }))),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private realm$ = new ReplaySubject<RealmEnum>();

    constructor(injector: Injector, private shopsService: ApiShopsService) {
        super(injector);
    }

    ngOnChanges({ realm }: ComponentChanges<ShopsFieldComponent>): void {
        if (realm) this.realm$.next(realm.currentValue);
    }
}
