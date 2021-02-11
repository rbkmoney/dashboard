import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject, defer, Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Injectable()
export class UserService {
    profile$: Observable<KeycloakProfile> = defer(() => this.loadProfile$).pipe(
        switchMap(() => this.keycloakService.loadUserProfile()),
        untilDestroyed(this),
        shareReplay(1)
    );
    // TODO: use id/subject from JWT
    id$: Observable<string> = this.profile$.pipe(pluck('username'));

    private loadProfile$ = new BehaviorSubject<void>(undefined);

    constructor(private keycloakService: KeycloakService) {}

    reloadProfile() {
        this.loadProfile$.next();
    }
}
