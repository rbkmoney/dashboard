import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';

import { ENV, Env } from '../environments';

@Component({
    selector: 'dsh-root',
    templateUrl: 'app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(@Inject(ENV) public env: Env) {}
}
