import { NgModule } from '@angular/core';
import { KeycloakAngularModule } from './keycloak-stub';

import { AppAuthGuardService } from './app-auth-guard.service';

@NgModule({
    imports: [KeycloakAngularModule],
    providers: [AppAuthGuardService]
})
export class AuthModule {}
