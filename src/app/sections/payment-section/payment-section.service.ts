import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { pluck, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../custom-operators';
import { SettingsService } from '../../settings';
import { RouteEnv } from '../route-env';

@Injectable()
export class PaymentSectionService {
    isActive$ = new BehaviorSubject(false);

    private bannerName = 'test-env-banner';

    constructor(private settingsService: SettingsService, private route: ActivatedRoute) {
        this.route.params.pipe(pluck('envID'), shareReplay(SHARE_REPLAY_CONF)).subscribe((envID) => {
            if (envID === RouteEnv.test) {
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
