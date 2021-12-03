import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { pluck, shareReplay, switchMap } from 'rxjs/operators';

import { ClaimsService, CLAIM_STATUS } from '@dsh/api/claims';
import { ApiShopsService } from '@dsh/api/shop';
import { ContextService } from '@dsh/app/shared/services/context';
import { booleanDelay, takeError } from '@dsh/operators';

import { ActionBtnContent, TestEnvBtnContent } from './content-config';
import { toContentConf } from './to-content-conf';

@Injectable()
export class PaymentsService {
    subheading$: Observable<string>;
    actionBtnContent$: Observable<ActionBtnContent>;
    testEnvBtnContent$: Observable<TestEnvBtnContent>;
    isLoading$: Observable<boolean>;

    constructor(
        private shopService: ApiShopsService,
        private claimService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private contextService: ContextService
    ) {
        const claims = this.contextService.organization$.pipe(
            switchMap(({ id }) =>
                this.claimService.search1000Claims(id, [
                    CLAIM_STATUS.Pending,
                    CLAIM_STATUS.PendingAcceptance,
                    CLAIM_STATUS.Review,
                ])
            ),
            shareReplay(1)
        );
        const contentConfig = toContentConf(this.shopService.shops$, claims);
        this.actionBtnContent$ = contentConfig.pipe(pluck('actionBtnContent'));
        this.testEnvBtnContent$ = contentConfig.pipe(pluck('testEnvBtnContent'));
        this.subheading$ = contentConfig.pipe(pluck('subheading'));
        this.isLoading$ = combineLatest([this.shopService.shops$, claims]).pipe(booleanDelay());
        combineLatest([this.isLoading$, contentConfig])
            .pipe(takeError)
            .subscribe(() => this.snackBar.open(this.transloco.translate('commonError'), 'OK'));
    }
}
