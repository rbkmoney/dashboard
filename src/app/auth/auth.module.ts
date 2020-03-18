import { NgModule } from '@angular/core';

import { AppAuthGuardService } from './app-auth-guard.service';
import { KeycloakAngularModule } from './keycloak';

@NgModule({
    imports: [KeycloakAngularModule],
    providers: [AppAuthGuardService]
})
export class AuthModule {}
