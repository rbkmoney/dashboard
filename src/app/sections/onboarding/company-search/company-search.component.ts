import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { CompanyDetails } from './company-details';
import { LeaveOnboardingDialogComponent } from './leave-onboarding-dialog';
import { SuggestionData } from '../../../dadata/model/suggestions';
import { SuggestionType } from '../../../dadata/model/type';
import { ContractorTypeSelect } from './manual-contractor-selector';

@Component({
    selector: 'dsh-company-search',
    templateUrl: 'company-search.component.html',
    styleUrls: ['company-search.component.scss']
})
export class CompanySearchComponent implements OnInit, OnDestroy {
    form: FormGroup;
    companyDetails: CompanyDetails;
    manualContractorSelector = false;

    private dialogSub: Subscription = Subscription.EMPTY;

    constructor(
        private dialog: MatDialog,
        private router: Router,
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            searchStr: ['']
        });
    }

    ngOnDestroy() {
        this.dialogSub.unsubscribe();
    }

    back() {
        this.dialogSub = this.dialog
            .open(LeaveOnboardingDialogComponent, {
                width: '450px'
            })
            .afterClosed()
            .pipe(filter(r => r === 'decline'))
            .subscribe(() => this.router.navigate(['/']));
    }

    next() {
        this.router.navigate(['onboarding', 1, 'legal-entity']);
    }

    updateSuggestion(suggestion: SuggestionData<SuggestionType.party>) {
        this.manualContractorSelector = false;
        this.companyDetails = this.toCompanyDetails(suggestion);
    }

    searchSuggestionError(e: any) {
        this.manualContractorSelector = true;
        this.snackBar.open(`Запрос закончился ошибкой (${e.status})`, 'OK', {
            duration: 5000
        });
    }

    suggestionNotFound() {
        this.manualContractorSelector = true;
    }

    manualSelectContractorType(type: ContractorTypeSelect) {
        console.log(type);
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
