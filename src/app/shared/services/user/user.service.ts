import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject, defer, Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {
    profile$: Observable<KeycloakProfile> = defer(() => this.loadProfile$).pipe(
        switchMap(() => this.keycloakService.loadUserProfile()),
        shareReplay(1)
    );
    id$ = this.profile$.pipe(pluck('username'));

    private loadProfile$ = new BehaviorSubject<void>(undefined);

    constructor(private keycloakService: KeycloakService) {}

    reloadProfile() {
        this.loadProfile$.next();
    }
}
