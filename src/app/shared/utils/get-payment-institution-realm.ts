import { PaymentInstitutionRealm } from '../../api';
import { RouteEnv } from '../../sections/route-env';

export function getPaymentInstitutionRealm(routeEnv: RouteEnv): PaymentInstitutionRealm {
    return routeEnv === RouteEnv.real ? 'live' : 'test';
}
