import { Route } from '@angular/router';

import { Roles } from './roles';
import { AppAuthGuardService } from './app-auth-guard.service';

export function protectedRoute(route: Route, roles: Roles[]): Route {
    return {
        ...route,
        canActivate: [...(route.canActivate || []), AppAuthGuardService],
        data: { ...(route.data || {}), roles }
    };
}
