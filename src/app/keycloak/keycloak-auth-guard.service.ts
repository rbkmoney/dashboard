import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { KeycloakService } from './keycloak.service';

export abstract class KeycloakAuthGuard implements CanActivate {
    protected authenticated: boolean;

    protected roles: string[];

    constructor(protected router: Router, protected keycloakAngular: KeycloakService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                this.authenticated = await this.keycloakAngular.isLoggedIn();
                this.roles = await this.keycloakAngular.getUserRoles(true);

                const result = await this.isAccessAllowed(route, state);
                resolve(result);
            } catch (error) {
                reject('An error happened during access validation. Details:' + error);
            }
        });
    }

    abstract isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>;
}
