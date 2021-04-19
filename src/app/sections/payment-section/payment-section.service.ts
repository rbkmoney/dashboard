import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, pluck, take } from 'rxjs/operators';

import { PaymentInstitutionRealm } from '@dsh/api/model';

import { SettingsService } from '../../settings';

@Injectable()
export class PaymentSectionService {
    private testBannerVisibleState$ = new BehaviorSubject(false);

    isTestEnvBannerVisible$ = this.testBannerVisibleState$.asObservable();

    private bannerName = 'test-env-banner';

    constructor(private settingsService: SettingsService, private route: ActivatedRoute) {
        this.route.params
            .pipe(
                pluck('realm'),
                filter((realm) => realm === PaymentInstitutionRealm.Test),
                filter(() => {
                    const v = this.settingsService.getSessionStorageItem(this.bannerName);
                    return v === 'true' || v === null;
                }),
                take(1)
            )
            .subscribe((r) => this.testBannerVisibleState$.next(r));
    }

    close() {
        this.testBannerVisibleState$.next(false);
        this.settingsService.setSessionStorageItem(this.bannerName, 'false');
    }
}
