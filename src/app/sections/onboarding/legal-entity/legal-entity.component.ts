import { Component } from '@angular/core';
import { OnboardingService } from '../onboarding.service';

@Component({
    templateUrl: 'legal-entity.component.html',
    styleUrls: ['../onboarding.component.scss'],
    providers: []
})
export class LegalEntityComponent {
    get form() {
        return this.onboardingService.form.get('legalEntity');
    }

    constructor(private onboardingService: OnboardingService) {}
}
