import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import RealmEnum = PaymentInstitution.RealmEnum;

export type PaymentInstitutionRealmToken = Observable<RealmEnum>;
export const PAYMENT_INSTITUTION_REALM_TOKEN = new InjectionToken<PaymentInstitutionRealmToken>(
    'PAYMENT_INSTITUTION_REALM_TOKEN'
);
