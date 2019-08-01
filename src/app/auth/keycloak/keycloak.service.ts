import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Observer, Subject } from 'rxjs';
import { KeycloakOptions, KeycloakEvent } from 'keycloak-angular';

import { STUB_USER } from './stub-user';

@Injectable()
export class KeycloakService {
    // tslint:disable-next-line: no-empty
    constructor() {}

    async init(options: KeycloakOptions = {}): Promise<boolean> {
        return true;
    }

    async login(options: Keycloak.KeycloakLoginOptions = {}): Promise<void> {
        console.log('login');
    }

    async logout(redirectUri?: string): Promise<void> {
        console.log('logout');
    }

    // tslint:disable-next-line: no-empty
    async register(options: Keycloak.KeycloakLoginOptions = { action: 'register' }): Promise<void> {}

    isUserInRole(role: string): boolean {
        return true;
    }

    getUserRoles(allRoles: boolean = true): string[] {
        return [];
    }

    async isLoggedIn(): Promise<boolean> {
        return true;
    }

    isTokenExpired(minValidity: number = 0): boolean {
        return false;
    }

    async updateToken(minValidity: number = 5): Promise<boolean> {
        return true;
    }

    async loadUserProfile(forceReload: boolean = false): Promise<Keycloak.KeycloakProfile> {
        return STUB_USER;
    }

    async getToken(): Promise<string> {
        return Math.random().toString();
    }

    getUsername(): string {
        return STUB_USER.username;
    }

    // tslint:disable-next-line: no-empty
    clearToken(): void {}

    addTokenToHeader(headersArg?: HttpHeaders): Observable<HttpHeaders> {
        return Observable.create(async (observer: Observer<any>) => {
            let headers = headersArg;
            if (!headers) {
                headers = new HttpHeaders();
            }
            try {
                const token: string = await this.getToken();
                headers = headers.set('Authorization', 'Bearer ' + token);
                observer.next(headers);
                observer.complete();
            } catch (error) {
                observer.error(error);
            }
        });
    }

    getKeycloakInstance(): Keycloak.KeycloakInstance {
        return {} as Keycloak.KeycloakInstance;
    }

    get bearerExcludedUrls(): string[] {
        return [];
    }

    get enableBearerInterceptor(): boolean {
        return true;
    }

    get keycloakEvents$(): Subject<KeycloakEvent> {
        return new Subject();
    }
}
