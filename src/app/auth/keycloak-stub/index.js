import { environment } from '../../../environments/environment';
import * as stubKeycloak from './index.stub';
import * as realKeycloak from './index.real';

const { KeycloakAngularModule, KeycloakAuthGuard, KeycloakService } = environment.fakeKeycloak
    ? stubKeycloak
    : realKeycloak;

export { KeycloakAngularModule, KeycloakAuthGuard, KeycloakService };
