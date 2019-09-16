import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { CompanyDetails } from './company-details';
import { LeaveOnboardingDialogComponent } from './leave-onboarding-dialog';
import { SuggestionData } from '../../../dadata/model/suggestions';
import { SuggestionType } from '../../../dadata/model/type';
import { LocaleDictionaryService } from '../../../locale';
import { CompanySearchService } from './company-search.service';
import { ContractorType } from './contractor-type';

@Component({
    templateUrl: 'company-search.component.html',
    styleUrls: ['company-search.component.scss'],
    providers: [CompanySearchService]
})
export class CompanySearchComponent implements OnInit {
    dicBasePath = 'sections.onboarding.companySearch';
    form: FormGroup;
    companyDetails: CompanyDetails;
    manualContractorSelector = false;

    private contractorType: ContractorType;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private dicService: LocaleDictionaryService,
        private companySearchService: CompanySearchService
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            searchStr: ''
        });
    }

    back() {
        this.dialog
            .open(LeaveOnboardingDialogComponent, {
                width: '450px'
            })
            .afterClosed()
            .pipe(filter(r => r === 'decline'))
            .subscribe(() => this.router.navigate(['/']));
    }

    next() {
        this.companySearchService
            .createInitialClaim(this.contractorType)
            .subscribe(id => this.router.navigate(['onboarding', id, 'basic-info']));
    }

    updateSuggestion(suggestion: SuggestionData<SuggestionType.party>) {
        this.manualContractorSelector = false;
        this.contractorType = this.companySearchService.suggestionToContractorType(suggestion);
        this.companyDetails = this.toCompanyDetails(suggestion);
    }

    searchSuggestionError() {
        this.manualContractorSelector = true;
        this.snackBar.open(this.dicService.mapDictionaryKey('common.httpError'), 'OK');
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
