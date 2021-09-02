import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import { PaymentInstitutionRealmService } from './payment-institution-realm.service';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class RealmMixService<T> {
    mixedValue$: Observable<T & { realm: RealmEnum }>;

    private mix$ = new Subject<T>();

    constructor(private paymentInstitutionRealmService: PaymentInstitutionRealmService) {
        this.mixedValue$ = combineLatest([this.paymentInstitutionRealmService.realm$, this.mix$]).pipe(
            map(([realm, value]) => ({
                ...value,
                realm,
            }))
        );
    }

    mix(value: T): void {
        this.mix$.next(value);
    }
}
