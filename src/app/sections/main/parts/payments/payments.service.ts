import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

import { ClaimsService, ShopService } from '../../../../api';
import { ClaimStatus } from '../../../../api/claims';
import { toContentConf } from './to-content-conf';
import { ActionBtnContent, TestEnvBtnContent } from './content-config';
import { booleanDelay, takeError } from '../../../../custom-operators';
import { LanguageService } from '../../../../language';

@Injectable()
export class PaymentsService {
    subheading$: Observable<string>;
    actionBtnContent$: Observable<ActionBtnContent>;
    testEnvBtnContent$: Observable<TestEnvBtnContent>;
    isLoading$: Observable<boolean>;

    constructor(
        private shopService: ShopService,
        private claimService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private language: LanguageService
    ) {
        const claims = this.claimService.search1000Claims([
            ClaimStatus.Pending,
            ClaimStatus.PendingAcceptance,
            ClaimStatus.Review
        ]);
        const contentConfig = toContentConf(this.shopService.shops$, claims);
        this.actionBtnContent$ = contentConfig.pipe(map(c => c.actionBtnContent));
        this.testEnvBtnContent$ = contentConfig.pipe(map(c => c.testEnvBtnContent));
        this.subheading$ = contentConfig.pipe(map(c => c.subheading));
        this.isLoading$ = combineLatest(this.shopService.shops$, claims).pipe(booleanDelay());
        this.transloco.selectTranslation(this.language.active).subscribe(t => {
            combineLatest(this.isLoading$, contentConfig)
                .pipe(takeError)
                .subscribe(() => this.snackBar.open(t.commonError, 'OK'));
        });
    }
}
