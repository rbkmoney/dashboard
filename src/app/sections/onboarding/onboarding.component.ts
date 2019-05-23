import { Component, ViewChild } from '@angular/core';

import { OnboardingService } from './onboarding.service';
import { SuggestionData } from '../../dadata/model/suggestions';
import { SuggestionType } from '../../dadata/model/type';
import { DaDataAutocompleteComponent } from '../../dadata/dadata.component';

@Component({
    templateUrl: 'onboarding.component.html',
    styleUrls: ['./onboarding.component.scss'],
    providers: []
})
export class OnboardingComponent {
    @ViewChild(DaDataAutocompleteComponent)
    daDadataAutocomplete: DaDataAutocompleteComponent;

    get isNothingFound() {
        return this.daDadataAutocomplete.isNothingFound;
    }
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
    get canContinue(): boolean {
        return this.form.controls.type.valid || !!this.info;
    }
    get nextStep() {
        return this.onboardingService.nextStep;
    }
    get prevStep() {
        return this.onboardingService.prevStep;
    }

    constructor(private onboardingService: OnboardingService) {}

    updateSuggestion(suggestion: SuggestionData<SuggestionType.party>) {
        this.onboardingService.suggestion = suggestion;
    }
}
