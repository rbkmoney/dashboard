import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap, take } from 'rxjs/operators';

import { PartyContent } from '@dsh/api-codegen/aggr-proxy';
import { Contractor, QuestionaryData } from '@dsh/api-codegen/questionary';

import { CompanyDetails } from './company-details';
import { CompanySearchService } from './company-search.service';
import {
    contractorTypeToQuestionaryData,
    dadataDataToQuestionaryData,
    konturFocusDataToQuestionaryData,
} from './to-questionary-data';

@UntilDestroy()
@Component({
    templateUrl: 'company-search.component.html',
    styleUrls: ['company-search.component.scss'],
    providers: [CompanySearchService],
})
export class CompanySearchComponent {
    form: FormGroup = this.companySearchService.form;
    companyDetails: CompanyDetails;
    manualContractorSelector = false;
    isKnownOrgType: boolean;
    content: PartyContent;
    data$: Observable<QuestionaryData>;

    constructor(private companySearchService: CompanySearchService) {}

    leaveOnboarding(): void {
        this.companySearchService.leaveOnboarding();
    }

    next(): void {
        this.data$
            .pipe(
                switchMap((data) => this.companySearchService.createInitialClaim(data)),
                take(1)
            )
            .subscribe(({ claimID, documentID }) => this.companySearchService.goToOnboardingFlow(claimID, documentID));
    }

    updateSuggestion(content: PartyContent): void {
        this.isKnownOrgType = this.companySearchService.isKnownOrgType(content);
        if (this.isKnownOrgType) {
            this.manualContractorSelector = false;
            this.setDataByPartyContent(content);
        } else {
            this.manualContractorSelector = true;
            this.cleanData();
        }
    }

    searchSuggestionError(): void {
        this.manualContractorSelector = true;
        this.cleanData();
    }

    suggestionNotFound(): void {
        this.manualContractorSelector = true;
        this.cleanData();
    }

    manualContractorTypeSelected(t: Contractor.ContractorTypeEnum): void {
        this.setDataByManualContractorType(t);
    }

    private cleanData() {
        this.content = null;
        this.data$ = of<QuestionaryData>(null);
    }

    private setDataByManualContractorType(t: Contractor.ContractorTypeEnum) {
        this.content = null;
        this.data$ = of(contractorTypeToQuestionaryData(t));
    }

    private setDataByPartyContent(content: PartyContent) {
        this.content = content;
        this.data$ = this.companySearchService.loadKonturFocusData(content.inn).pipe(
            catchError((e) => {
                console.error('Kontur.Focus API error', e);
                return of(null);
            }),
            map((data) => (data ? konturFocusDataToQuestionaryData(data) : dadataDataToQuestionaryData(content))),
            untilDestroyed(this),
            shareReplay(1)
        );
    }
}
