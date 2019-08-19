import { Component, Input } from '@angular/core';

import { OnboardingService } from '../onboarding.service';

@Component({
    selector: 'dsh-onboarding-layout',
    templateUrl: 'layout.component.html'
})
export class LayoutComponent {
    @Input()
    title: string;

    @Input()
    hasNavigation = true;

    get items() {
        return this.onboardingService.steps;
    }

    constructor(private onboardingService: OnboardingService) {}
}
