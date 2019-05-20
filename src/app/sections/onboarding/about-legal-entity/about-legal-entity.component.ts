import { Component } from '@angular/core';
import { OnboardingService } from '../onboarding.service';

@Component({
    templateUrl: 'about-legal-entity.component.html',
    styleUrls: ['../onboarding.component.scss'],
    providers: []
})
export class AboutLegalEntityComponent {
    get form() {
        return this.onboardingService.form.get('legalEntity');
    }

    constructor(private onboardingService: OnboardingService) {}
}
