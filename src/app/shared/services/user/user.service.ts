import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {
    profile$: Observable<KeycloakProfile>;

    private loadProfile$ = new BehaviorSubject<void>(undefined);

    constructor(private keycloakService: KeycloakService) {
        this.profile$ = this.loadProfile$.pipe(
            switchMap(() => this.keycloakService.loadUserProfile()),
            shareReplay(1)
        );
    }

    reloadProfile() {
        this.loadProfile$.next();
    }
}
