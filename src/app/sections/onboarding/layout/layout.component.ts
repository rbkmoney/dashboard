import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { OnboardingService } from '../onboarding.service';

@Component({
    selector: 'dsh-onboarding-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss']
})
export class LayoutComponent {
    @Input()
    title: string;

    @Input()
    hasNavigation = true;

    get items() {
        return this.onboardingService.legalEntitySteps;
    }

    constructor(private router: Router, private onboardingService: OnboardingService) {}

    back() {
        this.router.navigate(['/']);
    }

    selectItem(item) {
        console.log(item);
    }
}
