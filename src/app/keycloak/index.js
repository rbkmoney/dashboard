import { environment } from '../../environments/environment';
import * as fakeKeycloak from './index.fake';
import * as realKeycloak from './index.real';

const { KeycloakAngularModule, KeycloakAuthGuard, KeycloakService } = environment.fakeKeycloak
    ? fakeKeycloak
    : realKeycloak;

export { KeycloakAngularModule, KeycloakAuthGuard, KeycloakService };
