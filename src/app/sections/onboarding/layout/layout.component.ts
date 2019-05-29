import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { OnboardingService, LEGAL_ENTITY_STEPS } from '../onboarding.service';

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
        return LEGAL_ENTITY_STEPS;
    }

    get selectedItem() {
        return LEGAL_ENTITY_STEPS[this.onboardingService.currentStep.idx];
    }

    constructor(private router: Router, private onboardingService: OnboardingService) {}

    back() {
        this.router.navigate(['/']);
    }

    selectItem(idx: number) {
        this.onboardingService.setStep(LEGAL_ENTITY_STEPS[idx]);
    }
}
