import { Component } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { PartyContent } from '@dsh/api-codegen/aggr-proxy';
import { LegalEntityType } from '@dsh/api-codegen/claim-management';
import { Contractor, QuestionaryData, IndividualEntity } from '@dsh/api-codegen/questionary';
import {
    contractorTypeToQuestionaryData,
    dadataDataToQuestionaryData,
    konturFocusDataToQuestionaryData,
} from '@dsh/app/shared/utils/to-questionary-data';
import { shareReplayUntilDestroyed } from '@dsh/operators';

import { CompanyDetails } from './company-details';
import { CompanySearchService } from './company-search.service';

@UntilDestroy()
@Component({
    templateUrl: 'company-search.component.html',
    styleUrls: ['company-search.component.scss'],
    providers: [CompanySearchService],
})
export class CompanySearchComponent {
    searchControl: FormControl<string> = this.companySearchService.form.controls.searchStr;
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
        if (content && this.companySearchService.isKnownOrgType(content)) {
            this.manualContractorSelector = false;
            this.setDataByPartyContent(content);
        } else {
            this.manualContractorSelector = !!content;
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

    manualContractorTypeSelected({
        contractorType,
        entityType,
    }: {
        contractorType: Contractor.ContractorTypeEnum;
        entityType: LegalEntityType.LegalEntityTypeEnum | IndividualEntity.IndividualEntityTypeEnum;
    }): void {
        this.content = null;
        this.data$ = of(contractorTypeToQuestionaryData(contractorType, entityType));
    }

    private cleanData() {
        this.content = null;
        this.data$ = of<QuestionaryData>(null);
    }

    private setDataByPartyContent(content: PartyContent) {
        this.content = content;
        this.data$ = this.companySearchService.loadKonturFocusData(content.inn).pipe(
            catchError((e) => {
                console.error('Kontur.Focus API error', e);
                return of(null);
            }),
            map((data) => (data ? konturFocusDataToQuestionaryData(data) : dadataDataToQuestionaryData(content))),
            shareReplayUntilDestroyed(this)
        );
    }
}
