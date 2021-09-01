import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import { PaymentInstitutionRealmService } from './payment-institution-realm.service';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class RealmMixinService<T> {
    valueAndRealm$: Observable<T & { realm: RealmEnum }>;

    private valueChange$ = new Subject<T>();

    constructor(private paymentInstitutionRealmService: PaymentInstitutionRealmService) {
        this.valueAndRealm$ = combineLatest([this.paymentInstitutionRealmService.realm$, this.valueChange$]).pipe(
            map(([realm, value]) => ({
                ...value,
                realm,
            }))
        );
    }

    valueChange(value: T): void {
        this.valueChange$.next(value);
    }
}
