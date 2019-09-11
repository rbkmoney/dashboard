import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SuggestionData } from '../../dadata/model/suggestions';
import { SuggestionType } from '../../dadata/model/type';

enum Type {
    legalEntity
}

interface Step {
    url: string;
    title: string;
}

export const LEGAL_ENTITY_STEPS: Step[] = [
    { url: '/onboarding/legal-entity', title: 'Сведения о юридическом лице' },
    { url: '/onboarding/business-info', title: 'Основная деятельность' },
    { url: '/onboarding/founders', title: 'Учредители' },
    { url: '/onboarding/representative', title: 'Представитель' },
    { url: '/onboarding/beneficial-owner', title: 'Бенефициарные владельцы' },
    { url: '/onboarding/financial-position', title: 'Финансовое положение' },
    { url: '/onboarding/tax-residency', title: 'Налоговое резидентство' },
    { url: '/onboarding/bank-details', title: 'Банковские реквизиты' },
    { url: '/onboarding/contact-info', title: 'Контактная информация' }
];

@Injectable()
export class OnboardingService {
    form: FormGroup;

    currentStep: { type: Type; idx: number } = {
        type: Type.legalEntity,
        idx: 0
    };

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
        this.setCurrentStep();
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

    setStep(step: Step) {
        this.router.navigate([step.url]);
        this.currentStep = {
            type: Type.legalEntity,
            idx: LEGAL_ENTITY_STEPS.findIndex(s => s === step)
        };
    }

    setStepByOffset(steps: Step[], offset: number) {
        const idx = steps.findIndex(({ url }) => url === this.router.url) + offset;
        let step: Step;
        if (idx >= steps.length) {
            step = steps[steps.length - 1];
        } else if (idx < 0) {
            step = steps[0];
        } else {
            step = steps[idx];
        }
        this.setStep(step);
    }

    setCurrentStep() {
        this.currentStep = {
            type: Type.legalEntity,
            idx: LEGAL_ENTITY_STEPS.findIndex(step => step.url === this.router.url)
        };
    }

    nextStep = () => {
        this.setStepByOffset(LEGAL_ENTITY_STEPS, 1);
    };

    prevStep = () => {
        this.setStepByOffset(LEGAL_ENTITY_STEPS, -1);
    };
}
