import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import * as Sentry from '@sentry/angular';
import { first } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '@dsh/app/shared';
import { ContextService } from '@dsh/app/shared/services/context';

import { BootstrapService } from '../bootstrap.service';

@UntilDestroy()
@Component({
    selector: 'dsh-sections',
    templateUrl: 'sections.component.html',
    providers: [ContextService, BootstrapService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent implements OnInit {
    bootstrapped$ = this.bootstrapService.bootstrapped$;

    constructor(
        private bootstrapService: BootstrapService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {}

    ngOnInit(): void {
        this.bootstrapService.bootstrap();
        this.keycloakTokenInfoService.partyID$
            .pipe(first(), untilDestroyed(this))
            .subscribe((partyID) => Sentry.setUser({ id: partyID }));
    }
}
