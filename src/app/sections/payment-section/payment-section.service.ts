import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, pluck, take } from 'rxjs/operators';

import { SettingsService } from '../../settings';
import { RouteEnv } from '../route-env';

@Injectable()
export class PaymentSectionService {
    private testBannerVisibleState$ = new BehaviorSubject(false);

    isTestEnvBannerVisible$ = this.testBannerVisibleState$.asObservable();

    private bannerName = 'test-env-banner';

    constructor(private settingsService: SettingsService, private route: ActivatedRoute) {
        this.route.params
            .pipe(
                pluck('envID'),
                filter((envID) => envID === RouteEnv.test),
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
