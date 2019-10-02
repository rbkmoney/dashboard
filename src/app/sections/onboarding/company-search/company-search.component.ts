import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

import { CompanyDetails } from './company-details';
import { SuggestionData } from '../../../dadata/model/suggestions';
import { SuggestionType } from '../../../dadata/model/type';
import { CompanySearchService } from './company-search.service';
import { ContractorType } from './contractor-type';

@Component({
    templateUrl: 'company-search.component.html',
    styleUrls: ['company-search.component.scss'],
    providers: [CompanySearchService]
})
export class CompanySearchComponent {
    form: FormGroup = this.companySearchService.form;
    companyDetails: CompanyDetails;
    manualContractorSelector = false;
    contractorType: ContractorType;

    constructor(
        private snackBar: MatSnackBar,
        private companySearchService: CompanySearchService,
        private transloco: TranslocoService
    ) {}

    back() {
        this.companySearchService.showLeaveOnboardingDialog().subscribe(() => this.companySearchService.leave());
    }

    next() {
        this.companySearchService
            .createInitialClaim(this.contractorType)
            .subscribe(id => this.companySearchService.goToOnboardingFlow(id));
    }

    updateSuggestion(suggestion: SuggestionData<SuggestionType.party>) {
        this.contractorType = this.companySearchService.suggestionToContractorType(suggestion);
        if (!this.contractorType) {
            this.manualContractorSelector = true;
        } else {
            this.manualContractorSelector = false;
            this.companyDetails = this.toCompanyDetails(suggestion);
        }
    }

    searchSuggestionError() {
        this.manualContractorSelector = true;
        this.snackBar.open(this.transloco.translate('httpError'), 'OK');
    }

    suggestionNotFound() {
        this.manualContractorSelector = true;
    }

    manualSelectContractorType(type: ContractorType) {
        this.contractorType = type;
    }

    // TODO temporary solution
    private toCompanyDetails({
        value,
        data: { address, ogrn, inn, kpp }
    }: SuggestionData<SuggestionType.party>): CompanyDetails {
        return {
            name: value,
            address: address.value,
            ogrn,
            inn,
            kpp
        };
    }
}
