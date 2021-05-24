import { Component, Inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as Sentry from '@sentry/angular';
import { first } from 'rxjs/operators';

import { ENV, Env } from '../environments';
import { BootstrapService } from './bootstrap.service';
import { KeycloakTokenInfoService } from './shared';

@UntilDestroy()
@Component({
    selector: 'dsh-root',
    templateUrl: 'app.component.html',
    providers: [BootstrapService],
})
export class AppComponent implements OnInit {
    bootstrapped$ = this.bootstrapService.bootstrapped$;

    constructor(
        private bootstrapService: BootstrapService,
        @Inject(ENV) public env: Env,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {}

    ngOnInit(): void {
        this.bootstrapService.bootstrap();
        this.keycloakTokenInfoService.partyID$
            .pipe(first(), untilDestroyed(this))
            .subscribe((partyID) => Sentry.setUser({ id: partyID }));
    }
}
