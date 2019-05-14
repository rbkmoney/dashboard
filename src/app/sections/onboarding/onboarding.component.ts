import { Component } from '@angular/core';
import { OnboardingService } from './onboarding.service';
import { SuggestionData } from '../../dadata/model/suggestions';
import { SuggestionType } from '../../dadata/model/type';

@Component({
    templateUrl: 'onboarding.component.html',
    styleUrls: [],
    providers: []
})
export class OnboardingComponent {
    get form() {
        return this.onboardingService.form;
    }
    get info() {
        return this.onboardingService.suggestion ? this.onboardingService.suggestion.data : undefined;
    }

    constructor(private onboardingService: OnboardingService) {}

    updateSuggestion(suggestion: SuggestionData<SuggestionType.party>) {
        this.onboardingService.suggestion = suggestion;
    }
}
