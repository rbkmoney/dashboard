import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SuggestionData } from '../../dadata/model/suggestions';
import { SuggestionType } from '../../dadata/model/type';

@Injectable()
export class OnboardingService {
    form: FormGroup;
    legalEntitySteps = [
        '/onboarding',
        '/onboarding/legal-entity',
        '/onboarding/business-info',
        '/onboarding/founders',
        '/onboarding/representative',
        '/onboarding/beneficial-owner'
    ];

    private _suggestion: SuggestionData<SuggestionType.party>;
    get suggestion() {
        return this._suggestion;
    }
    set suggestion(suggestion) {
        if (suggestion) {
            const legalEntityControls = (this.form.get('legalEntity') as FormGroup).controls;
            // TODO: Данные устанавливаются, для примера, из ДаДата, нужно будет брать из Контур.Фокус
            legalEntityControls.russianName.setValue(suggestion.data.name.full_with_opf);
            legalEntityControls.internationalName.setValue(suggestion.data.name.latin);
            legalEntityControls.inn.setValue(suggestion.data.inn);
            legalEntityControls.ogrn.setValue(suggestion.data.ogrn);
            legalEntityControls.registrationDate.setValue(new Date(suggestion.data.state.registration_date));
        }
        this._suggestion = suggestion;
    }

    constructor(private fb: FormBuilder, private router: Router) {
        this.form = fb.group({
            suggestions: [''],
            type: ['', Validators.required],
            legalEntity: this.createLegalEntityGroup()
        });
        this.form.controls.suggestions.valueChanges.subscribe(() => {
            this.suggestion = undefined;
            this.form.controls.type.setValue(undefined);
            this.form.controls.legalEntity = this.createLegalEntityGroup();
        });
    }

    createLegalEntityGroup() {
        return this.fb.group({
            russianName: ['', Validators.required],
            internationalName: [''],
            inn: ['', Validators.required],
            ogrn: ['', Validators.required],
            registrationDate: ['', Validators.required],
            legalForm: ['', Validators.required],
            registrationAddress: ['', Validators.required],
            actualAddress: ['', Validators.required],
            additionalSpace: ['Не имеется', Validators.required],
            okatoCode: [''],
            okpoCode: [''],
            propertyInfo: ['', Validators.required]
        });
    }

    getStepUrl(steps: string[], change: number) {
        const idx = steps.findIndex(step => step === this.router.url) + change;
        if (idx >= steps.length) {
            return steps[steps.length - 1];
        }
        if (idx < 0) {
            return steps[0];
        }
        return steps[idx];
    }

    nextStep = () => {
        this.router.navigate([this.getStepUrl(this.legalEntitySteps, 1)]);
    };

    prevStep = () => {
        this.router.navigate([this.getStepUrl(this.legalEntitySteps, -1)]);
    };
}
