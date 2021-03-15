import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';

@Injectable()
export class KeycloakTokenInfoService {
    private decoded$ = from(this.keycloakService.getToken()).pipe(
        map((token) => jwt_decode(token)),
        shareReplay(1)
    );

    partyID$: Observable<string> = this.decoded$.pipe(pluck('sub'));

    constructor(private keycloakService: KeycloakService) {}
}
