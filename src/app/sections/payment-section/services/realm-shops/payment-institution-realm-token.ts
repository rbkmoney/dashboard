import { InjectionToken } from '@angular/core';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import RealmEnum = PaymentInstitution.RealmEnum;

export const PAYMENT_INSTITUTION_REALM_TOKEN = new InjectionToken<RealmEnum>('PAYMENT_INSTITUTION_REALM_TOKEN');
