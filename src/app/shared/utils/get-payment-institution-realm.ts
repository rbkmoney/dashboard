import { RouteEnv } from '../../sections/route-env';

export enum PaymentInstitutionRealm {
    live = 'live',
    test = 'test',
}

export function getPaymentInstitutionRealm(routeEnv: RouteEnv): PaymentInstitutionRealm {
    return routeEnv === RouteEnv.real ? PaymentInstitutionRealm.live : PaymentInstitutionRealm.test;
}
