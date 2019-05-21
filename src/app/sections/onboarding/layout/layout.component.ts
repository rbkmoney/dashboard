import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-onboarding-layout',
    templateUrl: 'layout.component.html',
    styleUrls: [],
    providers: []
})
export class LayoutComponent {
    @Input()
    title: string;

    @Input()
    hasNavigation = true;

    constructor() {}
}
