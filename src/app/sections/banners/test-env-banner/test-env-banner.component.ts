import { Component } from '@angular/core';

import { Mascots } from '../global-banner/mascots';
import { TestEnvBannerService } from './test-env-banner.service';

@Component({
    selector: 'dsh-test-env-banner',
    templateUrl: 'test-env-banner.component.html',
    providers: [TestEnvBannerService],
})
export class TestEnvBannerComponent {
    isActive$ = this.testEnvBannerService.isActive$;
    mascots = Mascots;

    constructor(private testEnvBannerService: TestEnvBannerService) {}

    onClose() {
        this.testEnvBannerService.close();
    }
}
