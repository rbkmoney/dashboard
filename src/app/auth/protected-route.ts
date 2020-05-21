import { Route } from '@angular/router';

import { AppAuthGuardService } from './app-auth-guard.service';
import { Roles } from './roles';

export function protectedRoute(route: Route, roles: Roles[]): Route {
    return {
        ...route,
        canActivate: [...(route.canActivate || []), AppAuthGuardService],
        data: { ...(route.data || {}), roles },
    };
}
