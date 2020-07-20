import { Injectable } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, filter, pluck, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../custom-operators';
import { SettingsService } from '../../settings';
import { RouteEnv } from '../route-env';

@Injectable()
export class PaymentSectionService {
    isActive$ = new BehaviorSubject(false);

    private bannerName = 'test-env-banner';

    constructor(private settingsService: SettingsService, private router: Router) {
        this.router.events
            .pipe(
                filter((event: RouterEvent) => !!event.url),
                pluck('url'),
                debounceTime(300),
                shareReplay(SHARE_REPLAY_CONF)
            )
            .subscribe((url) => {
                const isTestEnvUrl = url.includes(`env/${RouteEnv.test}`);
                if (isTestEnvUrl) {
                    const sessionStorageValue = this.settingsService.getSessionStorageItem(this.bannerName);
                    if (sessionStorageValue === 'true' || sessionStorageValue === null) {
                        this.isActive$.next(true);
                    }
                } else {
                    this.isActive$.next(false);
                }
            });
    }

    close() {
        this.isActive$.next(false);
        this.settingsService.setSessionStorageItem(this.bannerName, 'false');
    }
}
