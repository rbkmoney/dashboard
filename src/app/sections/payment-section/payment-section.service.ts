import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { SettingsService } from '../../settings';
import { RouteEnv } from '../route-env';

@Injectable()
export class PaymentSectionService {
    private testEnvBannerChange$ = new Subject<void>();

    isTestEnvBannerVisible$ = this.testEnvBannerChange$.pipe(
        switchMap(() => this.route.params),
        pluck('envID'),
        map((envID) => envID === RouteEnv.test),
        map((isTest) => {
            if (isTest) {
                const sessionStorageValue = this.settingsService.getSessionStorageItem(this.bannerName);
                return sessionStorageValue === 'true' || sessionStorageValue === null;
            } else {
                return isTest;
            }
        })
    );

    private bannerName = 'test-env-banner';

    constructor(private settingsService: SettingsService, private route: ActivatedRoute) {
        this.testEnvBannerChange$.subscribe();
    }

    close() {
        this.settingsService.setSessionStorageItem(this.bannerName, 'false');
        this.testEnvBannerChange$.next();
    }
}
