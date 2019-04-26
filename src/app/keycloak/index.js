import { environment } from '../../environments/environment';
import * as fakeKeycloak from './keycloak.fake';
import * as realKeycloak from './keycloak.real';

const { KeycloakAngularModule, KeycloakAuthGuard, KeycloakService } = environment.fakeKeycloak
    ? fakeKeycloak
    : realKeycloak;

export { KeycloakAngularModule, KeycloakAuthGuard, KeycloakService };
