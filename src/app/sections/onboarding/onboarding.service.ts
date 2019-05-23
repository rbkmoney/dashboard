import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SuggestionData } from '../../dadata/model/suggestions';
import { SuggestionType } from '../../dadata/model/type';

interface Step {
    url: string;
    title: string;
}

@Injectable()
export class OnboardingService {
    form: FormGroup;

    legalEntitySteps: Step[] = [
        { url: '/onboarding/legal-entity', title: 'Сведения о юридическом лице' },
        { url: '/onboarding/business-info', title: 'Основная деятельность' },
        { url: '/onboarding/founders', title: 'Учредители' },
        { url: '/onboarding/representative', title: 'Представитель' },
        { url: '/onboarding/beneficial-owner', title: 'Бенефициарные владельцы' },
        { url: '/onboarding/financial-position', title: 'Финансовое положение' },
        { url: '/onboarding/tax-residency', title: 'Налоговое резиденство' },
        { url: '/onboarding/bank-details', title: 'Банковские реквизиты' },
        { url: '/onboarding/contact-info', title: 'Контактная информация' }
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
            russianName: [''],
            internationalName: [''],
            inn: [''],
            ogrn: [''],
            registrationDate: [''],
            legalForm: [''],
            registrationAddress: [''],
            actualAddress: [''],
            additionalSpace: ['Не имеется'],
            okatoCode: [''],
            okpoCode: [''],
            propertyInfo: ['']
        });
    }

    getStepUrl(steps: Step[], change: number): string {
        const idx = steps.findIndex(step => step.url === this.router.url) + change;
        if (idx >= steps.length) {
            return steps[steps.length - 1].url;
        }
        if (idx < 0) {
            return steps[0].url;
        }
        return steps[idx].url;
    }

    nextStep = () => {
        this.router.navigate([this.getStepUrl(this.legalEntitySteps, 1)]);
    };

    prevStep = () => {
        this.router.navigate([this.getStepUrl(this.legalEntitySteps, -1)]);
    };
}
