import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SuggestionData } from '../../dadata/model/suggestions';
import { SuggestionType } from '../../dadata/model/type';
import { Step } from './stepper/stepper-item/stepper-item.component';

@Injectable()
export class OnboardingService {
    claimID = 1;

    get steps(): Step[] {
        const urlPrefix = `/onboarding/${this.claimID}`;
        return [
            { url: `${urlPrefix}/legal-entity`, title: 'Сведения о юридическом лице' },
            { url: `${urlPrefix}/business-info`, title: 'Основная деятельность', status: 'success' },
            { url: `${urlPrefix}/founders`, title: 'Учредители' },
            { url: `${urlPrefix}/representative`, title: 'Представитель' },
            { url: `${urlPrefix}/beneficial-owner`, title: 'Бенефициарные владельцы' },
            { url: `${urlPrefix}/financial-position`, title: 'Финансовое положение' },
            { url: `${urlPrefix}/tax-residency`, title: 'Налоговое резиденство' },
            { url: `${urlPrefix}/bank-details`, title: 'Банковские реквизиты' },
            { url: `${urlPrefix}/contact-info`, title: 'Контактная информация' }
        ];
    }

    form: FormGroup;

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
}
