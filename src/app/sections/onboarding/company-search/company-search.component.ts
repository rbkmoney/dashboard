import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CompanyDetails } from './company-details';
import { CompanySearchService } from './company-search.service';
import { PartyContent } from '../../../api-codegen/aggr-proxy';
import { QuestionaryData, Contractor } from '../../../api-codegen/questionary';
import { partyContentToQuestionaryData, contractorTypeToQuestionaryData } from './to-questionary-data';

@Component({
    templateUrl: 'company-search.component.html',
    styleUrls: ['company-search.component.scss'],
    providers: [CompanySearchService]
})
export class CompanySearchComponent {
    form: FormGroup = this.companySearchService.form;
    companyDetails: CompanyDetails;
    manualContractorSelector = false;
    isKnownOrgType: boolean;
    content: PartyContent;

    private data: QuestionaryData;

    constructor(private companySearchService: CompanySearchService) {}

    back() {
        this.companySearchService.showLeaveOnboardingDialog().subscribe(() => this.companySearchService.leave());
    }

    next() {
        this.companySearchService
            .createInitialClaim(this.data)
            .subscribe(id => this.companySearchService.goToOnboardingFlow(id));
    }

    updateSuggestion(content: PartyContent) {
        this.isKnownOrgType = this.companySearchService.isKnownOrgType(content);
        if (this.isKnownOrgType) {
            this.manualContractorSelector = false;
            this.data = partyContentToQuestionaryData(content);
            this.content = content;
        } else {
            this.manualContractorSelector = true;
            this.data = null;
        }
    }

    searchSuggestionError() {
        this.manualContractorSelector = true;
        this.data = null;
    }

    suggestionNotFound() {
        this.manualContractorSelector = true;
        this.data = null;
    }

    manualContractorTypeSelected(t: Contractor.ContractorTypeEnum) {
        this.data = contractorTypeToQuestionaryData(t);
    }
}
