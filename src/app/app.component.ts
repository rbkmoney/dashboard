import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { filter } from 'rxjs/operators';

import { ENV, Env } from '../environments';
import { BootstrapService } from './bootstrap.service';

@Component({
    selector: 'dsh-root',
    templateUrl: 'app.component.html',
    providers: [BootstrapService],
})
export class AppComponent implements OnInit {
    bootstrapSuccessful$ = this.bootstrapService.bootstrapped$.pipe(filter((r) => !!r));

    constructor(
        private bootstrapService: BootstrapService,
        @Inject(ENV) public env: Env,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    ngOnInit() {
        this.bootstrapService.bootstrap();
        this.bootstrapService.bootstrapped$
            .pipe(filter((r) => !r))
            .subscribe(() => this.snackBar.open(this.transloco.translate('errors.bootstrapAppFailed'), 'OK'));
    }
}
