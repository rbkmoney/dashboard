import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { OnboardingService, LEGAL_ENTITY_STEPS } from '../onboarding.service';
import { SelectEvent } from '../../../state-nav';

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
        return LEGAL_ENTITY_STEPS;
    }

    get selectedItem() {
        return LEGAL_ENTITY_STEPS[this.onboardingService.currentStep.idx];
    }

    constructor(private router: Router, private onboardingService: OnboardingService) {}

    back() {
        this.router.navigate(['/']);
    }

    selectItem({ idx }: SelectEvent) {
        this.onboardingService.setStep(LEGAL_ENTITY_STEPS[idx]);
    }
}
