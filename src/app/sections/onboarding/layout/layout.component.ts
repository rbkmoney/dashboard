import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'dsh-onboarding-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss'],
    providers: []
})
export class LayoutComponent {
    @Input()
    title: string;

    @Input()
    hasNavigation = true;

    constructor(private router: Router) {}

    back() {
        this.router.navigate(['/']);
    }
}
