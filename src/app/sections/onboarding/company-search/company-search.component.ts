import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { take, shareReplay, map, switchMap, catchError } from 'rxjs/operators';

import { CompanyDetails } from './company-details';
import { CompanySearchService } from './company-search.service';
import { PartyContent } from '../../../api-codegen/aggr-proxy';
import { QuestionaryData, Contractor } from '../../../api-codegen/questionary';
import {
    dadataDataToQuestionaryData,
    contractorTypeToQuestionaryData,
    konturFocusDataToQuestionaryData
} from './to-questionary-data';

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

    data$: Observable<QuestionaryData>;

    constructor(private companySearchService: CompanySearchService) {}

    leaveOnboarding() {
        this.companySearchService.leaveOnboarding();
    }

    next() {
        this.data$
            .pipe(
                switchMap(data => this.companySearchService.createInitialClaim(data)),
                take(1)
            )
            .subscribe(({ claimID, documentID }) => this.companySearchService.goToOnboardingFlow(claimID, documentID));
    }

    updateSuggestion(content: PartyContent) {
        this.isKnownOrgType = this.companySearchService.isKnownOrgType(content);
        if (this.isKnownOrgType) {
            this.manualContractorSelector = false;
            this.setDataByPartyContent(content);
        } else {
            this.manualContractorSelector = true;
            this.cleanData();
        }
    }

    searchSuggestionError() {
        this.manualContractorSelector = true;
        this.cleanData();
    }

    suggestionNotFound() {
        this.manualContractorSelector = true;
        this.cleanData();
    }

    manualContractorTypeSelected(t: Contractor.ContractorTypeEnum) {
        this.setDataByManualContractorType(t);
    }

    private cleanData() {
        this.content = null;
        this.data$ = of(null);
    }

    private setDataByManualContractorType(t: Contractor.ContractorTypeEnum) {
        this.content = null;
        this.data$ = of(contractorTypeToQuestionaryData(t));
    }

    private setDataByPartyContent(content: PartyContent) {
        this.content = content;
        this.data$ = this.companySearchService.loadKonturFocusData(content.inn).pipe(
            catchError(e => {
                console.error('Kontur.Focus API error', e);
                return of(null);
            }),
            map(data => (data ? konturFocusDataToQuestionaryData(data) : dadataDataToQuestionaryData(content))),
            shareReplay(1)
        );
    }
}
