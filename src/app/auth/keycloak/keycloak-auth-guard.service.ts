import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { KeycloakService } from './keycloak.service';

export abstract class KeycloakAuthGuard implements CanActivate {
    protected authenticated: boolean;

    protected roles: string[];

    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {}

    async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        return true;
    }

    abstract isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>;
}
