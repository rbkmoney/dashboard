import { Component } from '@angular/core';
import { OnboardingService } from './onboarding.service';
import { SuggestionData } from '../../dadata/model/suggestions';
import { SuggestionType } from '../../dadata/model/type';

@Component({
    templateUrl: 'onboarding.component.html',
    styleUrls: ['./onboarding.component.scss'],
    providers: []
})
export class OnboardingComponent {
    get form() {
        return this.onboardingService.form;
    }
    get info() {
        return this.onboardingService.suggestion ? this.onboardingService.suggestion.data : undefined;
    }
    get ogrnInnKpp() {
        const existing = [['ОГРН', this.info.ogrn], ['ИНН', this.info.inn], ['КПП', this.info.kpp]].filter(v => !!v[1]);
        return {
            label: existing.map(([l]) => l).join(' / '),
            value: existing.map(([, v]) => v).join(' / ')
        };
    }

    constructor(private onboardingService: OnboardingService) {}

    updateSuggestion(suggestion: SuggestionData<SuggestionType.party>) {
        this.onboardingService.suggestion = suggestion;
    }
}
