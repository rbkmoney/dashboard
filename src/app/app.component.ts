import { Component, Inject, OnInit } from '@angular/core';

import { ScreenSizeControlService } from '@dsh/app/shared';

import { ENV, Env } from '../environments';
import { BootstrapService } from './bootstrap.service';

@Component({
    selector: 'dsh-root',
    templateUrl: 'app.component.html',
    providers: [BootstrapService, ScreenSizeControlService],
})
export class AppComponent implements OnInit {
    bootstrapped$ = this.bootstrapService.bootstrapped$;

    constructor(
        private bootstrapService: BootstrapService,
        private screenSizeControlService: ScreenSizeControlService,
        @Inject(ENV) public env: Env
    ) {}

    ngOnInit() {
        this.bootstrapService.bootstrap();
        this.screenSizeControlService.init();
    }
}
