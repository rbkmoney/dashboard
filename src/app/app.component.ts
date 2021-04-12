import { Component, Inject, OnInit } from '@angular/core';

import { ENV, Env } from '../environments';
import { BootstrapService } from './bootstrap.service';

@Component({
    selector: 'dsh-root',
    templateUrl: 'app.component.html',
    providers: [BootstrapService],
})
export class AppComponent implements OnInit {
    bootstrapped$ = this.bootstrapService.bootstrapped$;

    constructor(private bootstrapService: BootstrapService, @Inject(ENV) public env: Env) {}

    ngOnInit() {
        this.bootstrapService.bootstrap();
    }
}
