import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-navbar',
    templateUrl: 'navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
